
const Profile = require("./profile.js");
const studentProfile = new Profile("reginabattle");

studentProfile.on("end", console.dir);
studentProfile.on("error", console.error);