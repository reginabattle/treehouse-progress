
// Home Route
function home(request, response) {
	if(request.url === "/"){
		response.writeHead(200, {'Content-type':'text/plain'});
		response.write(`Header \n`);
		response.write(`Search \n`);
		response.end(`Footer \n`);
	}
}

// User Router
function user(request, response) {
	const username = request.url.replace("/", "");
	if(username.length > 0){
		response.writeHead(200, {'Content-type':'text/plain'});
		response.write(`Header \n`);
		response.write(`${username} \n`);
		response.end(`Footer \n`);
	}
}

module.exports.home = home;
module.exports.user = user;