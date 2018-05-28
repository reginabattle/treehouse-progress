const router = require("./router");

// Create web server
const http = require('http');
http.createServer((request, response) => {
	router.home(request, response);
	router.user(request, response);
}).listen(3000, () => {
	console.log('Server running...');
});