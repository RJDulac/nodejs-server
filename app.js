//import function from nodejs -importing global http module
const http = require('http');
const fs = require('fs');

//event driven architecture -executes function when we get server requests
const server = http.createServer((req,res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        //listen on data event
        req.on('data',(chunk)=> {
        console.log(chunk);
            body.push(chunk);
        });
        //fired when done parsing incoming data from stream
        req.on('end',() =>{
            //all chunks are in an array and turned into a string
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.text', message);
        });
        //write file
        // fs.writeFileSync('message.text', 'Dummy Text');
        //redirect user
        res.statusCode = 302;
        //where we redirect user
        res.setHeader('Location', '/');
        //use return to avoid running html code
        return res.end();
    }
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