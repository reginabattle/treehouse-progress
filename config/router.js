const Profile = require("../profile/profile.js");
const renderer = require("./renderer.js");
const fs = require("fs");
const querystring = require("querystring");
const contentType = {'Content-Type':'text/html'};

// Home Route
function home(request, response) {
	if(request.url === "/"){
		if(request.method.toLowerCase() === "get") {
			response.writeHead(200, contentType);
			renderer.view("header", {}, response);
			renderer.view("search", {}, response);
			renderer.view("footer", {}, response);
			response.end();
		} else {
			request.on("data", postBody => {
				let query = querystring.parse(postBody.toString());
				response.writeHead(303, {'Location': `/${query.username}`});
				response.end();
			});
		}
	}
}

// User Route
function user(request, response) {
	let username = request.url.replace("/", "");
	if(username.length > 0){
		response.writeHead(200, contentType);
		renderer.view("header", {}, response);

		// Get JSON from Treehouse
	  let studentProfile = new Profile(username);
		studentProfile.on("end", profileJSON => {

			// Store profile info
			let values = {
				avatar: profileJSON.gravatar_url,
				name: profileJSON.name,
				username: profileJSON.profile_name,
				badges: profileJSON.badges.length,
				htmlPoints: profileJSON.points['HTML'],
				cssPoints: profileJSON.points['CSS'],
				javascriptPoints: profileJSON.points['JavaScript']
			}

			// Response
			renderer.view("profile", values, response);
			renderer.view("footer", {}, response);
			response.end();
		});

		// Error
		studentProfile.on("error", error => {
			renderer.view("error", {errorMessage: error.message}, response);
			renderer.view("search", {}, response);
			renderer.view("footer", {}, response);
			response.end();
		});
	}
}

// CSS Route
function css(request, response) {
  let css = fs.readFileSync('../assets/css/main.css');
  response.writeHead(200, {'Content-Type': 'text/css'});
  response.write(css);
  response.end();
}

// JS Route
function js(request, response) {
  let js = fs.readFileSync('../assets/js/scripts.min.js');
  response.writeHead(200, {'Content-Type': 'text/javascript'});
  response.write(js);
  response.end();
}

module.exports.home = home;
module.exports.user = user;
module.exports.css = css; 
module.exports.js = js;