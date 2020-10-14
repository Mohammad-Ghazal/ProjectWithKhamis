const accounts = require("./accounts.js");
const express = require("express");
const mainPosts = require("./posts.js");

const authRouter = express.Router();

authRouter.get("/posts/:id", (req,res) => {
    res.json(accounts[req.params.id - 1].posts);
    //TODO :: we can handle ids to get conntact of post
});

authRouter.post("/create-new-post/:id", (req,res) => {
    if(accounts[req.params.id - 1].posts[0] === "no posts shared yet on this account") {
        accounts[req.params.id - 1].posts.shift();
    }
   
   
    let date = new Date();
    newPostId = date.getFullYear().toString() + date.getMonth()+
    date.getDay()+date.getHours()+date.getMinutes() + date.getUTCMilliseconds();

    mainPosts[newPostId] = {postId: newPostId,
                         content:  req.body.post,
                         autherId:   req.params.id,
                        likes : {}//ids of users who liked the post
                        };

// accounts[req.params.id - 1].posts.push(req.body.post);
    accounts[req.params.id-1].posts.push(newPostId); //add the post id at the owner data
    

console.log( mainPosts);
console.log( accounts);

    res.json(req.body.post);

});





//TODO : handle this with new dataBase shape (edit abd remove options)


authRouter.put("/edit-post/:id/:postNumber", (req, res) => {//have to edit form "posts" object not from account info any more
    if(accounts[req.params.id - 1].posts[0] === "no posts shared yet on this account") return res.json("There is no posts");
    const index = req.params.postNumber - 1;
    if(accounts[req.params.id - 1].posts[index] === undefined) return res.json("There is no post in that index");
    accounts[req.params.id - 1].posts[index] = req.body.post;
    res.json(accounts[req.params.id - 1].posts[index]);
});

authRouter.delete("/remove-post/:id/:postNumber", (req, res) => {  //have to remove from "posts" and from account info
    if(accounts[req.params.id - 1].posts[0] === "no posts shared yet on this account") return res.json("There is no posts");
    const index = req.params.postNumber - 1;
    res.json(accounts[req.params.id - 1].posts.splice(index, 1)[0]);
});



module.exports = authRouter;