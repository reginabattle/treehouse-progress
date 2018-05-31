
const fs = require('fs');

// Replace {{key}} with values
function merge(values, content) {
	for(let key in values) {
		content = content.replace(`{{${key}}}`, values[key]);
	}
	return content;
}

function view(template, values, response) {
	let file = fs.readFileSync(`../views/${template}.html`, "utf8");
	file = merge(values, file);
	response.write(file);
}
module.exports.view = view;