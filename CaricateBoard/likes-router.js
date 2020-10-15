const accounts = require("./accounts.js");
const mainPosts = require("./posts.js");
const friendsRouter = require("./friends-router");
const express = require("express");
const posts = require("./posts.js");


const authRouter = express.Router();

authRouter.put("/like/:accountId/:postId", (req, res) => {
    let accId =req.params.accountId,postId=req.params.postId;


//mainPosts[getPostIndex(postId)].likes.push(accountId);
//console.log(mainPosts);
// console.log(mainPosts[0]);
// console.log(isPostExist(postId));
// console.log(getPostIndex("p1"));
// console.log(mainPosts[getPostIndex(postId)].likes);
// mainPosts[getPostIndex(postId)].likes.push(accId)
// //console.log(mainPosts[getPostIndex(postId)]);

// res.json("like the post is done"); 


    if(isPostExist){
    
       if(true)  //  if(friendsRouter.isAFrind(getPostAutherId(postId),accId))
      {
     // console.log(( mainPosts[getPostIndex(postId)].likes[0]===undefined))    
if (true)//!isPostLikedFromAcc(accId)

{

    mainPosts[getPostIndex(postId)].likes.push(accId);
}
  
//console.log(  typeof friendsRouter.isAFrind('1','2'));
    }

 res.json("like is done");
}else 
res.json("error");
}
);




const getPostIndex=(postId)=>{
let i ;
    if (isPostExist(postId))
    mainPosts.forEach((post,index) => {
        if (post.postId===postId)
        i=index;

}

);
return i
}

const isThePostAuther=(postId,accId)=>{
 return (post[getPostIndex(postId)].autherId===accId)
}
const isPostExist=(postId)=>{
    let result=false;
    mainPosts.forEach(post => {
      
        if (post.postId===postId)
        result= true;
    
    });
   return result;
   
}  
    
const isPostLikedFromAcc=(postId,accId)=>{
    let result =false;
    if( !mainPosts[getPostIndex(postId)].likes[0]===undefined)
    { 
      mainPosts[getPostIndex(postId)].likes.forEach(likerAcc=> {
        if(likerAcc===accId){
      result=true;      
        }
        })
    }
return result;
}

const getPostAutherId=(postId)=>{
    return mainPosts[getPostIndex(postId)].autherId
}
module.exports = authRouter;