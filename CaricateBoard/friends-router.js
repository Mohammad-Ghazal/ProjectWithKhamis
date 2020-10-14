const accounts = require("./accounts.js");
const express = require("express");

const authRouter = express.Router();

authRouter.get("/friends/:id", (req,res) => {
    console.log("friends hit")
    res.json(accounts[req.params.id - 1].friends);
});


authRouter.put("/add-new-friend/:id/:newFriendId", (req,res) => {
    

    if(accounts[req.params.newFriendId - 1] ===undefined)
      res.json("There is no sush  account id to add");
     //TODO: handle existing friends also 
     else
     //forEach(accounts[req.params.id-1].friends)
     //===undefined)
        
            accounts[req.params.id - 1].friends.push(req.params.newFriendId)
        accounts[req.params.newFriendId - 1].friends.push(req.params.id)
        res.json(accounts[req.params.newFriendId - 1].name + " is your friend now ");
         //toDoAfter (handle request and accept)

         
//         }else
//         res.json(accounts[req.params.newFriendId - 1].name + " is your friend aredy ");
//      }
//     console.log( accounts[req.params.id - 1].friends[accounts[req.params.newFriendId - 1]])
 
});

module.exports = authRouter;