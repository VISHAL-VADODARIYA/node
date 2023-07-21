const fs = require("fs");

fs.readFile("p3dummy1.txt", "utf-8", async (err, data) => {
  if (err) {
    console.log(err);
  }
  await console.log("dummy text 1 ", data);
});
console.log("hello");
fs.readFile("p3dummy2.txt", "utf-8", async (err, data) => {
  if (err) {
    console.log(err);
  }
  await console.log("dummy text 2 ", data);
});
