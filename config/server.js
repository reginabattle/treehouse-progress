const router = require("./router");
const http = require('http');

http.createServer((request, response) => {
	if(request.url === "/") {
		router.home(request, response);
	} else if(request.url.indexOf('.css') != -1) {
		router.css(request, response);
	} else {
		router.user(request, response);
	}
	
}).listen(3000, () => {
	console.log('Server running...');
});