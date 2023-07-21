const fs = require("fs");

fs.readFile("p4.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  const vowel = ["a", "e", "i", "o", "u"];
  let count = 0;
  for (let i = 0; i < data.length; i++) {
    if (!vowel.includes(data[i])) count = count + 1;
  }
  console.log("total consonants :", count);
});

fs.writeFileSync("person.txt", "this is person.txt file");

fs.readFile("person.txt", "utf-8", (err, data) => {
  if (err) console.log(err);
  console.log("person file :", data);
});

fs.unlinkSync("person.txt");
