
// Connect to Treehouse's API to get a user's badge count and JavaScript points.

const https = require('https');

// Print out badge count and points
function print(username, badgeCount, points){
	const message = `${username} has ${badgeCount} badges and ${points} JavaScript points.`;
	console.log(message);
}
// print(username, 234, 3265);

// Get profile info
function getProfile(username) {
	// Connect to the API
	const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {

		// Get status
		let status = response.statusCode;
		if(status == 200) {
			status = "Loading...";
		}
		console.log(status);

		// Get data
		let body = "";
		response.on('data', data =>{
			body += data.toString();
			//console.log(body); Print out JSON file
		});

		// Convert string (data) to an object
		response.on('end', () =>{
			const profile = JSON.parse(body);
			//console.log(profile); Print out parsed JSON file

			// Print out the data
			print(profile.name, profile.badges.length, profile.points['JavaScript']);
		});

	});
};
//getProfile("reginabattle");

// Get info for multiple users
const users = ["reginabattle", "chalkers"];
users.forEach(username => {
	getProfile(username);
});
