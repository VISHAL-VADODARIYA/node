const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/mongo-excercise");

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: Date,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course.find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .sort({ price: -1 }) // OR .sort('-price')
    .select({ name: 1, author: 1, price: 1 }); // OR .select('name author price')
}

async function run() {
  const courses = await getCourses();
  console.log(courses[0]);
}

run();
