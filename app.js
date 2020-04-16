var bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    express = require("express"),
    app = express();

mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb://localhost/blog_app", { useNewUrlParser: true });
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: { type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: "Online Picture Test",
//     image: "http://source.unsplash.com/800x400/?canada",
//     body: "Online Image Test!!!"
// });

app.get("/", function (req, res) {
    res.redirect("/blogs");
})

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
    // create blog
    Blog.create(req.body.blog, function (err, newBlog) {
        if (err) {
            res.render("new");
        } else {
            // redirect to index
            res.redirect("/blogs");
        }
    })
})





app.listen(3000, function () {
    console.log("Blog server has started");
})