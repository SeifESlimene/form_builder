// REQUIRE MONGOOSE LIBRARY
const mongoose = require('mongoose');
// INITIALIZE A SCHEMA
const { Schema } = mongoose;
// VARIABLES FOR SCHEMA
const requiredString = { type: String, required: true };
const requiredObject = { type: Object, required: true };
// DEFINING OUR logEntrySchema SCHEMA
const AnimalSchema = new Schema(
  {
    name: requiredString,
    link: requiredString,
    formFields: requiredObject
  },
  { timestamps: true }
);
// INSTANTIATE A MODEL WITH OUR SCHEMA
const Animal = mongoose.model('animals', AnimalSchema);
// EXPORT OUR MODEL
module.exports = Animal;
