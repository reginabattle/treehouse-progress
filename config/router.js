
const Profile = require("../profile/profile.js");

// Home Route
function home(request, response) {
	if(request.url === "/"){
		response.writeHead(200, {'Content-type':'text/plain'});
		response.write(`Header \n`);
		response.write(`Search \n`);
		response.end(`Footer \n`);
	}
}

// User Route
function user(request, response) {
	const username = request.url.replace("/", "");
	if(username.length > 0){
		response.writeHead(200, {'Content-type':'text/plain'});
		response.write(`Header \n`);

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
			response.write(`${values.name} has ${values.badges} badges. \n`);
			response.end(`Footer \n`);
		});

		// Error
		studentProfile.on("error", error => {
			response.end(`Footer \n`);
		});
	}
}

module.exports.home = home;
module.exports.user = user;