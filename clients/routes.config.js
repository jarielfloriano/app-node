const CitysController = require('./controllers/citys.controller');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');

exports.routesConfig = function (app) {
    app.post('/citys', [
        CitysController.insert
    ]);
    app.get('/citys', [
        ValidationMiddleware.validJWTNeeded,
        CitysController.list
    ]);
    app.get('/citys/uf/:uf', [
        ValidationMiddleware.validJWTNeeded,
        CitysController.getByUF
    ]);
    app.get('/citys/name/:name', [
        ValidationMiddleware.validJWTNeeded,
        CitysController.getByName
    ]);
};
