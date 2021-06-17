const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    name: String,
    uf: String
});

clientSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
clientSchema.set('toJSON', {
    virtuals: true
});

clientSchema.findById = function (cb) {
    return this.model('Clients').find({id: this.id}, cb);
};

const Client = mongoose.model('Clients', clientSchema);

exports.findByName = (name) => {
    return Client.find({name: name});
};

exports.findByUF = (uf) => {
    return Client.find({uf: uf});
};

exports.exists = (name, uf) => {
    return Client.find({name: name, uf: uf});
};

exports.findById = (id) => {
    return Client.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createClient = (clientData) => {
    const client = new Client(clientData);
    return client.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Client.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, clients) {
                if (err) {
                    reject(err);
                } else {
                    resolve(clients);
                }
            })
    });
};

exports.patchClient = (id, clientData) => {
    return Client.findOneAndUpdate({
        _id: id
    }, clientData);
};

exports.removeById = (clientId) => {
    return new Promise((resolve, reject) => {
        Client.deleteMany({_id: clientId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

