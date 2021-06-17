const ClientModel = require('../models/clients.model');

exports.insert = (req, res) => {
    ClientModel.createClient(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    ClientModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    ClientModel.findById(req.params.clientId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getByName = (req, res) => {
    ClientModel.findByName(req.params.name)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.patchById = (req, res) => {
    ClientModel.patchClient(req.params.clientId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = async (req, res) => {
    ClientModel.removeById(req.params.clientId)
        .then((result)=>{
            res.status(204).send({});
        });
};
