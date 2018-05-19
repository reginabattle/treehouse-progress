
// Connect to Treehouse's API to get a user's badge count and JavaScript points.

const https = require('https');
const http = require('http');

// Print error messages
function printError(error){
	console.error(error.message);
}

// Print badge count and points
function print(username, badgeCount, points){
	const message = `${username} has ${badgeCount} badges and ${points} JavaScript points.`;
	console.log(message);
}

// Get profile info
function getProfile(username) {
	try {
		// Connect to the API
		const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {

			// Get status
			const status = response.statusCode;

			if(status === 200) {
				// Get data
				let body = "";
				response.on('data', data =>{
					body += data.toString();
					//console.log(body); Print out JSON file
				});

				// Convert string (data) to an object
				response.on('end', () =>{
					try {
						const profile = JSON.parse(body);
						//console.log(profile); Print out parsed JSON file

						// Print out the data
						print(profile.name, profile.badges.length, profile.points['JavaScript']);

					} catch(error) {
						printError(error);
					}
				});

			} else {
				const message = `There was a problem  getting ${username}'s profile (${http.STATUS_CODES[response.statusCode]}).`;
				const statusCodeError = new Error(message);
				printError(statusCodeError);
			}
		});

		request.on('error', printError);

	} catch(error) {
		printError(error);
	}
};

// Get info for a single user
//getProfile("reginabattle");

// Get info for multiple users
//const users = ["reginabattle", "chalkers"];

// Command line arguments
//console.log(process.argv);
const users = process.argv.slice(2);

// Loop through users
users.forEach(getProfile);
