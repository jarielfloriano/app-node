const ClientsController = require('./controllers/clients.controller');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');

exports.routesConfig = function (app) {
    app.post('/clients', [
        ClientsController.insert
    ]);
    app.get('/clients', [
        ValidationMiddleware.validJWTNeeded,
        ClientsController.list
    ]);
    app.get('/clients/:clientId', [
        ValidationMiddleware.validJWTNeeded,
        ClientsController.getById
    ]);
    app.patch('/clients/:clientId', [
        ValidationMiddleware.validJWTNeeded,
        ClientsController.patchById
    ]);
    app.delete('/clients/:clientId', [
        ValidationMiddleware.validJWTNeeded,
        ClientsController.removeById
    ]);
    app.get('/clients/name/:name', [
        ValidationMiddleware.validJWTNeeded,
        ClientsController.getByName
    ]);
};
