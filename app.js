
// Problem: Show user's badge count and JavaScript points.
// Solution: Use Node.js to connect to Treehouse's API to get profile info.

const https = require('https');

// Print out badge count and points
function print(username, badgeCount, points){
	const message = `${username} has ${badgeCount} badges and ${points} points.`;
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
			status = "Looking good...";
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
getProfile("reginabattle");
