const fs = require("fs");

const data = process.argv[2];
fs.appendFile("person.txt",`\nHello ${data}`, (err, data) => {
  if (err) console.log(err);
});

fs.readFile("person.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  console.log(data);
});
