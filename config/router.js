
const Profile = require("../profile/profile.js");
const renderer = require("./renderer.js");

// Home Route
function home(request, response) {
	if(request.url === "/"){
		response.writeHead(200, {'Content-type':'text/plain'});
		renderer.view('header', {}, response);
		renderer.view('search', {}, response);
		renderer.view('footer', {}, response);
		response.end();
	}
}

// User Route
function user(request, response) {
	const username = request.url.replace("/", "");
	if(username.length > 0){
		response.writeHead(200, {'Content-type':'text/plain'});
		renderer.view('header', {}, response);

		// Get JSON from Treehouse
		const studentProfile = new Profile(username);
		studentProfile.on("end", profileJSON => {

			// Store profile info
			const values = {
				avatar: profileJSON.gravatar_url,
				name: profileJSON.name,
				username: profileJSON.profile_name,
				badges: profileJSON.badges.length,
				javascriptPoints: profileJSON.points['JavaScript']
			}

			// Response
			renderer.view('profile', values, response);
			renderer.view('footer', {}, response);
			response.end();
		});

		// Error
		studentProfile.on("error", error => {
			renderer.view('error', {errorMessage: error.message}, response);
			renderer.view('search', {}, response);
			renderer.view('footer', {}, response);
			response.end();
		});
	}
}

module.exports.home = home;
module.exports.user = user;