const http = require('http');
const fs = require('fs');
const url = require('url');


http.createServer(function (req, res){
    const q = url.parse(req.url, true);
    let filename = "";

    if (q.pathname === "/") {
        filename = "." + "/index.html";
      } else {
        filename = "." + q.pathname;
      }

    fs.readFile(filename, function(err, data){
        if (err){
            res.writeHead(404, {"Content-Type": "text/html"});
            res.write(page404);
            return res.end;
        } else {
        res.writeHead(200, { 'Content-Type' : 'text/html'});
        res.write(data);
        return res.end();
        }
    })
}).listen(8080);

const page404 = fs.readFileSync('404.html' , function(err, data) {
    if (err) throw err;
    return data;
})