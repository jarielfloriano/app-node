const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    name: {
        type: String,
        required: [true, 'O campo Nome é obrigatório'],
        trim: true,
    },
    gender: {
        type: String,
        required: [true, 'O campo Gênero é obrigatório'],
        enum: {
            values: ['male', 'female'],
            message: 'O campo gênero é inválido. Necessita ser "male" ou "female"'
        }
    },
    birth: {
        type: Date,
        required: [true, 'O campo Aniversário é obrigatório'],
    },
    age: {
        type: Number,
        required: [true, 'O campo Idade é obrigatório'],
    },
    city: {
        type: String,
        required: [true, 'O campo Cidade é obrigatório'],
    }
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

exports.exists = (name, uf) => {
    return Client.find({name: name, uf: uf});
};

exports.findById = (id) => {
    return Client.findById(id)
        .then((result) => {
            if (result) {
                result = result.toJSON()
                delete result._id;
                delete result.__v;
                return result;
            }
            return {}
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
    return Client.updateOne({
        _id: id
    }, clientData);
};

exports.removeById = (clientId) => {
    return new Promise((resolve, reject) => {
        Client.deleteOne({_id: clientId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

