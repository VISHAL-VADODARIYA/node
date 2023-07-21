const fs = require("fs");

fs.mkdirSync("person");

fs.renameSync("person.txt", "person/person.txt");
