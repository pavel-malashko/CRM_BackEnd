/**
 * auto-input-json-parser hook
 *
 * @description :: A hook definition.  Extends Sails by adding shadow routes, implicit actions, and/or initialization logic.
 * @docs        :: https://sailsjs.com/docs/concepts/extending-sails/hooks
 */

module.exports = function defineAutoInputJsonParserHook(sails) {

  return {

    /**
     * Runs when this Sails app loads/lifts.
     */
    initialize: async () => {

      hook = this;
      hook.handle = (req, keys) => {
        keys.forEach(key => {
          try {

            if (req.query[key])
              req.query[key] = JSON.parse(req.query[key]);

            if (req.body[key])
              req.body[key] = JSON.parse(req.body[key]);

          } catch (e) {}
        });
      }

    },

    routes: {
      before: {
        'GET /api/parameter/values': (req, res, next) => {
          hook.handle(req, ['typeIds']);
          return next();
        },
        'GET /api/product/filter': (req, res, next) => {
          hook.handle(req, ['params']);
          return next();
        },
        'GET /api/categories': (req, res, next) => {
          hook.handle(req, ['except']);
          return next();
        },
        'GET /api/parameter/types': (req, res, next) => {
          hook.handle(req, ['except']);
          return next();
        },
        'POST /api/product/store': (req, res, next) => {
          hook.handle(req, ['parameters']);
          return next();
        },
        'POST /api/product/update': (req, res, next) => {
          hook.handle(req, ['parameters']);
          return next();
        },
        'POST /api/category/update': (req, res, next) => {
          hook.handle(req, ['defaultParamTypes', 'parent']);
          return next();
        },
        'POST /api/category/store': (req, res, next) => {
          hook.handle(req, ['parent']);
          return next();
        },
        'POST /api/product/presentation/update': (req, res, next) => {
          hook.handle(req, ['slides']);
          return next();
        },
        'POST /api/product/presentation/slides/remove': (req, res, next) => {
          hook.handle(req, ['slides']);
          return next();
        },
        'POST /api/product/import/update': (req, res, next) => {
          hook.handle(req, ['mapping']);
          return next();
        },
        'POST /api/product/update-many': (req, res, next) => {
          hook.handle(req, ['ids']);
          return next();
        },
        'POST /api/product/destroy-many': (req, res, next) => {
          hook.handle(req, ['ids']);
          return next();
        },
        'POST /api/product/related/attach': (req, res, next) => {
          hook.handle(req, ['ids']);
          return next();
        },
        'POST /api/product/related/detach': (req, res, next) => {
          hook.handle(req, ['ids']);
          return next();
        },
      },
    }

  };

};
