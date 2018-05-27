
// Get profile
const profile = require ('./profile')
const users = process.argv.slice(2);

if (users.length > 0) { 
	users.forEach(profile.get);
} else {
	console.log("Enter a username. i.e. 'node index.js <username>'")
}
