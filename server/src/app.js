const app = require('express')();
const bodyParser = require('body-parser')
const mapRoute = require ('../api/routes/map');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.use('/map',mapRoute);


module.exports = app;