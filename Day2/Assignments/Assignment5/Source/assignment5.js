const fs = require("fs");
let userData;
process.argv[2] && process.argv[3]
  ? fs.readFile("userData.json", (err, data) => {
      userData = JSON.parse(data);
      console.log(err ? err : userData);
      for (let e of userData) {
        if (process.argv[2] === e.name && process.argv[3] === e.password) {
          console.log("hello ", process.argv[2]);
          return;
        }
      }
      console.log("unauthorized user");
    })
  : console.log("Enter UserName & Password ");
