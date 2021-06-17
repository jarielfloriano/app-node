const CityModel = require('../models/citys.model');

exports.insert = (req, res) => {
    CityModel.createCity(req.body)
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
    CityModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    CityModel.findById(req.params.cityId)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getByName = (req, res) => {
    CityModel.findByName(req.params.name)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.getByUF = (req, res) => {
    CityModel.findByUF(req.params.uf)
        .then((result) => {
            res.status(200).send(result);
        });
};

exports.patchById = (req, res) => {
    CityModel.patchCity(req.params.cityId, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    CityModel.removeById(req.params.cityId)
        .then((result)=>{
            res.status(204).send({});
        });
};