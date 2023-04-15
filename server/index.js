const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const multer = require("multer");
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes');
const fetchRoutes = require('./routes/fetchRoutes');
const editRoutes = require('./routes/editRoutes');
const deleteRoutes = require('./routes/deleteRoutes');

// Load environment variables
dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix+ '-' +file.originalname )
  }
})

//Database connection
const db = mysql.createConnection({
  // user: process.env.DBUSER,
  // password: process.env.DBPSWRD,
  // host:process.env.HOST,
  // database:process.env.DB
  user:'sql12612831',
  password:'HNrR8y8xK8',
  host:'sql12.freemysqlhosting.net',
  database:'sql12612831'
});


db.connect( (err) => {
  if(err){
      throw err;
  }
  console.log('Database connected');
});

global.db = db;

// Routes

app.use('/post' ,  postRoutes);
app.use('/get' , fetchRoutes );
app.use('/put' , editRoutes );
app.use('/delete' , deleteRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});