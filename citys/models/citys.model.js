const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const citySchema = new Schema({
    name: String,
    uf: String
});

citySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
citySchema.set('toJSON', {
    virtuals: true
});

citySchema.findById = function (cb) {
    return this.model('Citys').find({id: this.id}, cb);
};

const City = mongoose.model('Citys', citySchema);

exports.findByName = (name) => {
    return City.find({name: name});
};

exports.findByUF = (uf) => {
    return City.find({uf: uf});
};

exports.exists = (name, uf) => {
    return City.find({name: name, uf: uf});
};

exports.findById = (id) => {
    return City.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            return result;
        });
};

exports.createCity = (cityData) => {
    const city = new City(cityData);
    return city.save();
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        City.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, citys) {
                if (err) {
                    reject(err);
                } else {
                    resolve(citys);
                }
            })
    });
};

exports.patchCity = (id, cityData) => {
    return City.findOneAndUpdate({
        _id: id
    }, cityData);
};

exports.removeById = (cityId) => {
    return new Promise((resolve, reject) => {
        City.deleteMany({_id: cityId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

