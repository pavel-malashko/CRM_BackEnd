/**
 * storage hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

const fs = require('fs');
//const sharp = require('sharp');
const root = sails.config.storage.rootPath;
const url = sails.config.storage.url;
const uuidv1 = require('uuid/v1');

// async function resizeImage(originalFilePath, path, subfolder, filename, dimension) {
//
//   return new Promise((resolve, reject) => {
//
//     let newFilePath = `${root}${path}/${subfolder}/${filename}`;
//     // let originalFilePath = `${root}${path}/${filename}`;
//     let ref = `${path}/${subfolder}/${filename}`;
//
//     sharp(originalFilePath)
//       .resize(dimension)
//       .toFile(newFilePath, (err) => {
//         if (err) {
//           reject(err);
//         } else {
//           resolve(ref);
//         }
//       });
//
//   });
// }

function mkdirRecursive(directory) {
  let path = directory.replace(/\/$/, '').split('/');
  for (let i = 2; i < path.length; i++) {
    let segment = path.slice(0, i).join('/');
    ! fs.existsSync(segment) ? fs.mkdirSync(segment) : null ;
  }
}

module.exports = function defineStorageHook(sails) {

  return {

    /**
     * Runs when this Sails app loads/lifts.
     */
    initialize: async function() {
      sails.log.info('Initializing custom hook (`storage`), path: ' + root);
    },

    upload: async (upstream, model) => {
      return new Promise((resolve, reject) => {

        let config = sails.config.storage[model][upstream.fieldName];
        //mkdirRecursive(root + config.path + '/');

        Promise.all(upstream.files.map(f => {

          return new Promise(resolve1 => {

            let filename = uuidv1() + ('.' + f.name.split('.').pop() || '');

            let originalFilePath = `${root}${config.path}/${filename}`;
            let originalRef = `${config.path}/${filename}`;

            fs.rename(f.path, originalFilePath, function (err) {
              if (err) return reject(err);
              resolve1(originalRef);
            });

          });

        })).then(result => {
          resolve(result);
        }).catch(reject);

      });
    },

    destroy: async (urls) => {
      return new Promise((resolve, reject) => {
        if (! _.isString(urls) && ! _.isArray(urls))
          return reject(new Error('Bad input parameter, urls must be array or string'));
        if (_.isString(urls)) urls = [urls];

        urls.forEach(u => {
          if (u) {
            let path = root + u.replace(url, '');
            fs.stat(path, (err, stat) => {
              if ((err == null) && stat.isFile())
                fs.unlinkSync(path);
            });
          }
        });

        resolve();
      });
    },

    validate: (value, mimes, count) => {
      return value.count <= count
        && ! value.mimes.find(v => ! mimes.includes(v))
    },

    routes: {
      before: {
        'POST /*': (req, res, next) => {
          if (req.files) {
            try {
              _.keys(req.files).forEach(key => {
                let files = _.isArray(req.files[key]) ? req.files[key] : [req.files[key]];
                req.body[key] = {
                  upstream: {
                    fieldName: key,
                    files: files
                  },
                  count: files.length,
                  mimes: files.map(f => {
                    if (f.type && f.type !== 'application/octet-stream') {
                      return f.type;
                    } else {
                      switch (f.name.split('.').pop()) {
                        case 'xlsx': return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
                        case 'xls': return 'application/vnd.ms-excel';
                        case 'pdf': return 'application/pdf';
                        default: return 'application/octet-stream';
                      }
                    }
                  }),
                };
              });
            } catch (e) { }
          }
          return next();
        }
      },
    }

  };

};
