const express = require("express");
const mongoose = require("mongoose");
const app = express();
const genres = [
  { id: 1, name: "Horror" },
  { id: 2, name: "Action" },
  { id: 3, name: "Thriller" },
  { id: 4, name: "Romance" },
];

const Genre = new mongoose.model(
  "Genre",
  mongoose.Schema({
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 100,
    },
  })
);
app.get("/",(req,res)=>{res.send(genres)});


app.listen(4000)