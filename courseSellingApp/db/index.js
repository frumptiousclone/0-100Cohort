const mongoose = require('mongoose');
const { number, boolean } = require('zod');

// Connect to MongoDB
mongoose.connect('mongodb+srv://uttam282005:fMhURfRq54mAcKUR@cluster0.nnin2ah.mongodb.net/');

// Define schemas
const AdminSchema = new mongoose.Schema({
  // Schema definition here
  username: String,
  password: String,
  publishedCourses: []
});

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: []
})
const CourseSchema = new mongoose.Schema({
  courseTitle: String,
  courseId: Number,
  price: Number,
  description: String,
  imageLink: String,
  published: Boolean,
  publishedBy: String,
})

  const Admin = mongoose.model('Admin', AdminSchema);
  const User = mongoose.model('User', UserSchema);
  const Course = mongoose.model('Course', CourseSchema);

  module.exports = {
    Admin,
    User,
    Course
  }
