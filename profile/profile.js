// Connect to Treehouse's API to get a user's badge count and JavaScript points.
const EventEmitter = require("events").EventEmitter;
const https = require('https');
const http = require('http');
const util = require("util");

// Get profile info
function Profile(username) {

	EventEmitter.call(this);
  profileEmitter = this;

	// Connect to the API
	const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {

		let body = "";
		let status = response.statusCode;
			
		// Status code error
		if (response.statusCode !== 200) {
      request.abort();
      profileEmitter.emit("error", new Error("There was a problem getting the profile for " + username + ". (" + http.STATUS_CODES[response.statusCode] + ")"));
    }

    // Read the data
		response.on('data', data =>{
			body += data
			profileEmitter.emit("data", data);
		});

		// Parse the data
		response.on('end', () => {
			if(status === 200) {
				try {
					let profile = JSON.parse(body);
					profileEmitter.emit("end", profile);
				} catch(error) {
					profileEmitter.emit("error", error);
				}
			}
		}).on('error', () => {
			profileEmitter.emit("error", error);
		});

	});
};

util.inherits(Profile, EventEmitter);
module.exports = Profile;
