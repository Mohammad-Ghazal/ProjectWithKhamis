const accounts = require("./accounts.js");
const mainPosts = require("./posts.js");
const { friendsRouter, isAFrind } = require("./friends-router");
const express = require("express");
const posts = require("./posts.js");
const { indexOf } = require("./accounts.js");

const authRouter = express.Router();

authRouter.put("/like/:accountId/:postId", (req, res) => {
  let accId = req.params.accountId,
    postId = req.params.postId;

  console.log('AAAA',isPostExist(postId));
  if (isPostExist(postId)) {
    if (isAFrind(getPostAutherId(postId), accId)) {
      //!isPostLikedFromAcc(accId)
      // console.log(( mainPosts[getPostIndex(postId)].likes[0]===undefined))

      mainPosts[getPostIndex(postId)].likes.push(accId);

      //console.log(  typeof friendsRouter.isAFrind('1','2'));
      res.json("like is done");
    }
  } else res.json("error");
});
{
    77:{
        friends:{11:{id:11}}
        likes:['ali','amr']

    }
}
const isPostExist = (postId) => {
  const posts = mainPosts.filter((post) => {
    return post.postId === postId;
  });
  console.log(posts);
  if (posts.length>0) return true;
  return false;
  // mainPosts.forEach((post) => {

  //   if (post.postId === postId) return true;
  // });
};

const getPostAutherId = (postId) => {
  //return mainPosts[getPostIndex(postId)].autherId;
  return mainPosts[0].autherId;
};

const getPostIndex = (postId) => {
  return mainPosts.indexOf(
    mainPosts.filter((post) => {
      return post.postId === postId;
    })
  );
  //   mainPosts.forEach((post, index) => {
  //     if (post.postId === postId) return index;
  //   });
};

const isThePostAuther = (postId, accId) => {
  return post[getPostIndex(postId)].autherId === accId;
};

const isPostLikedFromAcc = (postId, accId) => {
  let result = false;
  if (!mainPosts[getPostIndex(postId)].likes[0] === undefined) {
    mainPosts[getPostIndex(postId)].likes.forEach((likerAcc) => {
      if (likerAcc === accId) {
        result = true;
      }
    });
  }
  return result;
};

module.exports = authRouter;
