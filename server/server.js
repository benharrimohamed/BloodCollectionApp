const http = require ('http');
const app = require ('./src/app')
const {port} = require ('./config/index')
const connection = require('./DB/connection');

const server = http.createServer(app);

server.listen(port , () => {
    console.log ('Runinng at '+port);
});