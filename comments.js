// Create web server application
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/comments');
var db = mongoose.connection;

// Check for DB errors
db.on('error', function(err) {
  console.log(err);
});

// Check for successful DB connection
db.once('open', function() {
  console.log('Connected to MongoDB');
});

// Bring in models
var Comment = require('./models/comment');

// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Set public folder for static files
app.use(express.static(path.join(__dirname, 'public')));

// Home Route
app.get('/', function(req, res) {
  Comment.find({}, function(err, comments) {
    if (err) {
      console.log(err);
    } else {
      res.render('index', {
        title: 'Comments',
        comments: comments
      });
    }
  });
});

// Add Route
app.get('/comments/add', function(req, res) {
  res.render('add_comment', {
    title: 'Add Comment'
  });
});

// Add Submit POST Route
app.post('/comments/add', function(req, res) {
  var comment = new Comment();
  comment.name = req.body.name;
  comment.comment = req.body.comment;

  comment.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

// Edit Route
app.get('/comments/edit/:id', function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    res.render('edit_comment', {
      title: 'Edit Comment',
      comment: comment
    });
  });
});

// Edit Submit POST Route
app.post('/comments/edit/:id', function(req, res) {
  var comment = {};
  comment.name = req.body.name;
  comment.comment = req.body.comment;

  var query = { _id: req.params.id };

  Comment.update(query, comment, function(err) {
    if (err) {
      console.log(err);
    } else {
