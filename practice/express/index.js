const Joi = require("joi");
const config = require('config')
const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./logger");
const express = require("express");
const app = express();

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(logger);
app.use(helmet());


//configuration
console.log('Application Name: ' + config.get('name'))
console.log('Mail Server: ' + config.get('mail.host'))
console.log('Mail Password: ' + config.get('mail.password'))

if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan Enabled...");
}

app.get("/", (req, res) => {
  res.send("hello this is from express");
});
app.get("/api/courses", (req, res) => {
  res.send([1, 2, 3, 4, 5, 6, 7]);
});

//get request
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("no such as courses with this ID");
  res.send(course);
});

// post request
app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error)
    return res.status(400).send(JSON.stringify(error.details[0].message));
  const course = {
    id: courses.length + 1,
    name: `${req.body.name}${courses.length + 1}`,
  };
  courses.push(course);
  res.send(course);
});

// put request
app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("no such as courses with this ID");

  const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);

  if (error)
    return res.status(400).send(JSON.stringify(error.details[0].message));

  course.name = req.body.name;
  res.send(course);
});

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
}

//delete request
app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("no such as courses with this ID");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}..`);
});
