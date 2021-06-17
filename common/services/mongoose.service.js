const mongoose = require('mongoose');
let count = 0;
// qmsAh-6DV.KQ8zc
const options = {
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    // all other approaches are now deprecated by MongoDB:
    useNewUrlParser: true,
    useUnifiedTopology: true

};
const connectWithRetry = () => {
    console.log('Iniciando conexão com o MongoDB ...')
    mongoose.connect("mongodb+srv://koba:%40Senha%3F@cluster-0.m8ffs.mongodb.net/application", options).then(()=>{
        console.log('MongoDB está conectado :)')
    }).catch(err=>{
        console.log('MongoDB não foi conectado, nova tentativa em 5 segundosgit . ', ++count);
        setTimeout(connectWithRetry, 5000)
    })
};

connectWithRetry();

exports.mongoose = mongoose;
