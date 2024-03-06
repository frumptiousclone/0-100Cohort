Course Selling Website Backend
Welcome to the backend repository of our course selling website project! This project provides a basic backend solution for managing courses and user authentication.

Features
User Authentication: Sign in as an admin or a regular user.
Admin Privileges: Admins can create new courses effortlessly.
Course Purchasing: Users can purchase courses seamlessly.
Database: MongoDB used for efficient data storage.
Tech Stack: Built with JavaScript, Express.js, JWT, and Zod.
API endpoints
Admin Endpoints-

Admin Signup: POST /admin/signup

Admin Create Courses: POST /admin/createCourses

Admin Get All Courses: GET /admin/courses

Admin Get Published Courses: GET /admin/publishedCourses

User Endpoints-

User Signup: POST /user/signup

User Get All Courses: GET /user/courses

User Purchase Course: POST /courses/:courseId

User Get Purchased Courses: GET /user/purchasedCourses
