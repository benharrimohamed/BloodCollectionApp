const mongoose = require('mongoose');
const {db_url} = require('../config/index');

const connection = mongoose.connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
  console.log('#[DATABASE CONNECTED]');
}).catch((err) => {console.log(err)});

module.exports = connection