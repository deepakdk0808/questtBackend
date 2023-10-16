const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    authors: { type: String, required: true, },
    average_rating: { type: String, required: true ,  validate: {
      validator: function (value) {
        return value <= 5;
      },
      message: 'Average rating must be less than or equal to 5.',
    },},
    isbn: { type: String, validate: {
      validator: function (value) { return /^\d{10}$/.test(value) },message: 'ISBN must be a 10-digit number.'},required: true},
    isbn13: { type: String, validate: {
      validator: function (value) {return /^\d{13}$/.test(value)},message: 'ISBN must be a 10-digit number.'},required: true},
    language_code: { type: String },
    num_pages: { type: Number, required: true },
    ratings_count:{type: Number, required: true},
    text_reviews_count:{type: Number, required: true},
    publication_date:{type:Date,required:true},
    publisher:{type: String, required: true,},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", BookSchema);
