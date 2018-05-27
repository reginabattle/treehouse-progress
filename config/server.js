 
 const http = require('http');
 const url = require('url');
 const path = require('path');
 const fs = require('fs');

 const mimeTypes = {
 	"html": "text/html",
 	"css": "text/css",
 	"js": "text/javascript",
 	"jpg": "image/jpg",
 	"svg": "image/svg+xml",
 }

 http.createServer((request, response) => {

  const uri = url.parse(request.url).pathname;
  const fileName = path.join(process.cwd(), unescape(uri));
  console.log('Loading' + uri);

  let stats;

  try {
  	stats = fs.lstatSync(fileName);
  } catch(e){
  	response.writeHead(404, {'Content-type':'text/plain'});
  	response.write('404 Not Found \n');
  	response.end();
  	return;
  }

  if(stats.isFile()) {
  	let mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
  	response.writeHead(200, {'Content-type': mimeType});
  	
  	let fileStream = fs.createReadStream(fileName);
  	fileStream.pipe(response);

  } else if(stats.isDirectory) {
  	response.writeHead(302, {
  		'Location': 'views/index.html'
  	});
  	response.end();

  } else {
  	response.writeHead(500, {'Content-type':'text/plain'});
  	response.write('500 Internal Error \n');
  	response.end();
  }

 }).listen(3000, () => {
  console.log('Server running at http://localhost:3000');
 });

