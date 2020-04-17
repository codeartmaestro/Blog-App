var expressSanitizer = require("express-sanitizer"),
   methodOverride = require("method-override"),
   bodyParser = require("body-parser"),
   mongoose = require("mongoose"),
   express = require("express"),
   app = express();

mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/blog_app", {
   useNewUrlParser: true,
});
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(
   bodyParser.urlencoded({
      extended: true,
   })
);
app.use(expressSanitizer()); // This must be after body parser
app.use(methodOverride("_method"));

var blogSchema = new mongoose.Schema({
   title: String,
   image: String,
   body: String,
   created: {
      type: Date,
      default: Date.now,
   },
});

var Blog = mongoose.model("Blog", blogSchema);

app.get("/", function (req, res) {
   res.redirect("/blogs");
});

// INDEX Route
app.get("/blogs", function (req, res) {
   Blog.find({}, function (err, blogs) {
      if (err) {
         console.log(err);
      } else {
<<<<<<< HEAD
         res.render("index", { blogs: blogs });
      }
   });
});

// NEW Route
app.get("/blogs/new", function (req, res) {
   res.render("new");
});

// CREATE Route
app.post("/blogs", function (req, res) {
<<<<<<< HEAD
=======
   // blog.body is because of the name of text area in form which is blog[body]
   req.body.blog.body = req.sanitize(req.body.blog.body);
>>>>>>> 620e01ef79a50b71b83639f7c8ffcccebf4b86f1
   // create blog
   Blog.create(req.body.blog, function (err, newBlog) {
      if (err) {
         res.render("new");
      } else {
         // redirect to index
         res.redirect("/blogs");
      }
   });
});

// SHOW Route
app.get("/blogs/:id", function (req, res) {
   Blog.findById(req.params.id, function (err, foundBlog) {
      if (err) {
         res.redirect("/blogs");
      } else {
<<<<<<< HEAD
         res.render("show", { blog: foundBlog });
=======
         res.render("show", {
            blog: foundBlog,
         });
>>>>>>> 620e01ef79a50b71b83639f7c8ffcccebf4b86f1
      }
   });
});

// EDIT Route
app.get("/blogs/:id/edit", function (req, res) {
   Blog.findById(req.params.id, function (err, foundBlog) {
      if (err) {
         res.redirect("/blogs");
      } else {
<<<<<<< HEAD
         res.render("edit", { blog: foundBlog });
=======
         res.render("edit", {
            blog: foundBlog,
         });
>>>>>>> 620e01ef79a50b71b83639f7c8ffcccebf4b86f1
      }
   });
});

// UPDATE Route
app.put("/blogs/:id", function (req, res) {
<<<<<<< HEAD
=======
   // blog.body is because of the name of text area in form which is blog[body]
   req.body.blog.body = req.sanitize(req.body.blog.body);
>>>>>>> 620e01ef79a50b71b83639f7c8ffcccebf4b86f1
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (
      err,
      updatedBlog
   ) {
      if (err) {
         res.redirect("/blogs/" + req.params.id + "edit");
      } else {
         res.redirect("/blogs/" + req.params.id);
      }
   });
});

// DESTROY Route
app.delete("/blogs/:id", function (req, res) {
   Blog.findByIdAndRemove(req.params.id, function (err) {
      if (err) {
         res.redirect("/blogs/" + req.params.id);
      } else {
         res.redirect("/blogs");
      }
   });
});

app.listen(3000, function () {
   console.log("Blog server has started");
});
