const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then((result) => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/,
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
    lowercase: true,
    // uppercase: true,
    trim: true,
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      isAsync: true,
      validator: function (v, callback) {
        setTimeout(() => {
          const result = v && v.lenght > 0;
          callback(result);
        }, 2000);
      },
      message: "A Course should have at least one tag",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);
async function createCourse() {
  const course = new Course({
    name: "AngularJS Course",
    category: "web",
    author: "vishal",
    tags: ["Frontend"],
    isPublished: true,
    price: 15,
  });
  try {
    // course.validate((err) => {
    //   if (err) {
    //   }
    // });
    const result = await course.save();
    console.log(result);
  } catch (ex) {
    // console.log(ex.message);
    for (field in ex.errors) console.log(ex.errors[field].message);
  }
}
createCourse();

async function getCourses() {
  const pageNumber = 2;
  const pageSize = 10;
  const courses = await Course.find({ author: "vishal", isPublished: true })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .count()
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });
  console.log(courses);
}
// getCourses();

// .find({price:{$gte:10,$lte:20}})
// .find({price:{$in:[10,20,30]}})
// .or([{autor:'vishal'},{isPublished:true}])
// .and([{autor:'vishal'},{isPublished:true}]) // it's similler to find
// .find({author:/^vishal/i}) // i is for case insensitive // get those data which author name start with this pattern
// .find({author:/vishal$/i}) // i is for case insensitive // get those data which author name end with this pattern
// .find({author:/.*vishal.*/i}) // i is for case insensitive // get those data which author name contains this pattern
// .count() // it will return total number of data get from database with this find method

async function updateCourse() {
  // 1)
  // const course = await Course.findById(id);
  // if (!course) return;

  // course.isPublished = true;
  // course.author = "Another Author";
  // const result = await course.save();
  // console.log(result);

  //2)
  // const result = await Course.Update(
  //   { _id: id },
  //   {
  //     $set: {
  //       author: "vishal",
  //       isPublished: false,
  //     },
  //   }
  // );
  // console.log(result);

  //3)
  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Jack",
        isPublished: true,
      },
    },
    { new: true }
  ); // here used for get updated data if it not use then return old data(without update)
  console.log(course);
}
// updateCourse("helloID");

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  console.log(result);

  //we can delete from any value like here we can use name for delete all the data which have same name
  const answer = await Course.deleteMany({ _id: id });
  console.log(answer);

  const course = await Course.findByIdAndRemove(id);
  console.log(course);
}
// removeCourse("helloID");
