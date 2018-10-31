//import function from nodejs -importing global http module
const http = require('http');

//event driven architecture -executes function when we get server requests
const server = http.createServer((req,res) => {
    console.log(req.url, req.method, req.headers);
    //ends server - hard exists event loop
    // process.exit();
    //tell it's html
    res.setHeader('Content-Type', "text/html");
    //writing html document
    res.write('<html>');
    res.write('<head><title>Node Server</title></head>');
    res.write('<body><h1>Hello from nodejs server!</h1></body>');
    res.write('</html>');
    //tell we're done sending
    res.end();
});
//listen for incoming requests -ongoing listener
server.listen(3000);