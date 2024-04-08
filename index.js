import express from "express";
import bodyParser from "body-parser";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simulated database
let posts = [];

app.get("/", (req, res) => {
    res.render("index", { posts: posts });
});

app.get("/new", (req, res) => {
    res.render("modify", { post: {}, action: "/new" });
});

app.post("/new", (req, res) => {
    const { title, content, author } = req.body;
    posts.push({ id: posts.length + 1, title, content, author });
    res.redirect("/");
});

app.get("/edit/:id", (req, res) => {
    const post = posts.find(post => post.id == req.params.id);
    res.render("modify", { post: post, action: `/edit/${post.id}` });
});

app.post("/edit/:id", (req, res) => {
    const { title, content, author } = req.body;
    const index = posts.findIndex(post => post.id == req.params.id);
    posts[index] = { id: posts[index].id, title, content, author };
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    posts = posts.filter(post => post.id != req.params.id);
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
