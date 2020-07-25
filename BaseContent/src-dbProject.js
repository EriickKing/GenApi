const config = require('../config/db_config');
const mongoose = require('mongoose');

module.exports = function () {
    mongoose.set('useNewUrlParser', true);
    mongoose.set('useFindAndModify', false);
    mongoose.set('useCreateIndex', true);
    mongoose.set('useUnifiedTopology', true);
    mongoose.connect(config.uri, {
            useNewUrlParser: true
        })
        .then(() => console.log("Connected to " + config.db))
        .catch(err => console.error(err.message));
};