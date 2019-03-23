/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */
const skipper = require('skipper');
const formidable = require('formidable');
const express = require('express');
const trimmer = require('express-trimmer');

module.exports.http = {

  /****************************************************************************
   *                                                                           *
   * Sails/Express middleware to run for every HTTP request.                   *
   * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
   *                                                                           *
   * https://sailsjs.com/documentation/concepts/middleware                     *
   *                                                                           *
   ****************************************************************************/

  middleware: {

    /***************************************************************************
     *                                                                          *
     * The order in which middleware should be run for HTTP requests.           *
     * (This Sails app's routes are handled by the "router" middleware below.)  *
     *                                                                          *
     ***************************************************************************/
    trimmer: trimmer,

    order: [
      'cookieParser',
      'session',
      'bodyParser',
      'trimmer',
      'compress',
      'poweredBy',
      'router',
      'www',
      'favicon',
    ],

    /***************************************************************************
     *                                                                          *
     * The body parser that will handle incoming multipart HTTP requests.       *
     *                                                                          *
     * https://sailsjs.com/config/http#?customizing-the-body-parser             *
     *                                                                          *
     ***************************************************************************/
    bodyParser: (req, res, next) => {
      if ((req.headers['content-type'] || '').split(';')[0] === 'multipart/form-data') {
        req.form = new formidable.IncomingForm();
        req.form.multiples = true;
        req.form.maxFieldsSize = 128 * 1024 * 1024;

        req.form.parse(req, (err, fields, files) => {
          if (err)
            return next(err);
          else {
            req.files = files;
            req.fields = fields;
            req.body = fields;
            next();
          }
        });
      } else {
        skipper()(req, res, next);
      }
    },

  },

};
