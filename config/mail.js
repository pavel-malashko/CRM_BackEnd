/**
 * Custom configuration
 * (sails.config.custom)
 *
 * One-off settings specific to your application.
 *
 * For more information on custom configuration, visit:
 * https://sailsjs.com/config/custom
 */

module.exports.mail = {

  from: 'PTS Ledgers <no-reply@abfprogramming.com>',
  support: 'andrei.kibak@bfb.by',

  nodemailer: {
    host: 'smtp.yandex.com',
    port: 465,
    secure: true,
    pool: true,
    auth: {
      user: 'no-reply@abfprogramming.com',
      pass: '_5bBw/3:^zHGfqSb'
    }
  }

};
