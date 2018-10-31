//import function from nodejs -importing global http module
const http = require('http');

//event driven architecture -executes function when we get server requests
const server = http.createServer((req,res) => {
    console.log(req);
});
//listen for incoming requests
server.listen(3000);