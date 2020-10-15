const accounts = require("./accounts.js");
const express = require("express");
const mainPosts = require("./posts.js");

const authRouter = express.Router();

authRouter.get("/posts", (req, res) => {
    res.json(mainPosts);
});

authRouter.get("/post", (req,res) => {
    res.json(mainPosts[req.body.id - 1]);
});

authRouter.post("/create-new-post/:id", (req,res) => {
    if(accounts[req.params.id - 1].posts[0] === "no posts shared yet on this account") {
        accounts[req.params.id - 1].posts.shift();
    }
   
    const date = new Date();
    postTime = date.getFullYear().toString() + date.getMonth() + date.getDay() + date.getHours() + date.getMinutes() + date.getUTCMilliseconds();
    const post = {
      postId: mainPosts.length + 1, 
      postTime,
      content: req.body.post,
      autherId: req.params.id,
      likes: [], 
    };
    mainPosts.push(post);
    mainPosts.forEach((post, index) => (post.postId = ++index));
    accounts[req.params.id - 1].posts = mainPosts; 
    res.json(req.body.post);
});

authRouter.put("/edit-post/:id", (req, res) => {
    if(accounts[req.params.id - 1].posts[0] === "no posts shared yet on this account") return res.json("There is no posts");
    const index = req.body.postId - 1;
    if(mainPosts[index] === undefined) return res.json("There is no post in that index");
    mainPosts[index].content = req.body.post;
    accounts[req.params.id - 1].posts = mainPosts;
    res.json(mainPosts[index].content);
});

authRouter.delete("/remove-post/:id", (req, res) => { 
    if(accounts[req.params.id - 1].posts[0] === "no posts shared yet on this account") return res.json("There is no posts");
    const index = req.body.id - 1;
    mainPosts.splice(index, 1);
    mainPosts.forEach((post, index) => post.postId = ++index);
    accounts[req.params.id - 1].posts = mainPosts;
    res.json(mainPosts);
});


module.exports = authRouter;