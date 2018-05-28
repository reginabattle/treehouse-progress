
const fs = require('fs');

function view(template, values, response) {
	const fileContent = fs.readFileSync(`../views/${template}.html`);
	response.write(fileContent);
}
module.exports.view = view;