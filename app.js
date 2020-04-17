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
   // blog.body is because of the name of text area in form which is blog[body]
   req.body.blog.body = req.sanitize(req.body.blog.body);
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
         res.render("show", { blog: foundBlog });
      }
   });
});

// EDIT Route
app.get("/blogs/:id/edit", function (req, res) {
   Blog.findById(req.params.id, function (err, foundBlog) {
      if (err) {
         res.redirect("/blogs");
      } else {
         res.render("edit", { blog: foundBlog });
      }
   });
});

// UPDATE Route
app.put("/blogs/:id", function (req, res) {
   // blog.body is because of the name of text area in form which is blog[body]
   req.body.blog.body = req.sanitize(req.body.blog.body);
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
