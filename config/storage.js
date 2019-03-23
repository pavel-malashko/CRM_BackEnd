/**
 * Storage configuration
 * (sails.config.storage)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.storage = {

  rootPath: process.env.PWD + '/storage',
  url: 'http://192.168.100.200:4337/storage',

  'Document': {
    file: {
      type: 'other',
      path: '/docs',
    },
  },

};
