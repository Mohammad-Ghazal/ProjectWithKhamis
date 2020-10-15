const accounts = require("./accounts.js");
const express = require("express");
const { compareSync } = require("bcrypt");

const authRouter = express.Router();

authRouter.get("/friends/:id", (req,res) => {
    console.log("friends hit")
    res.json(accounts[req.params.id - 1].friends);
});


authRouter.put("/add-new-friend/:id/:newFriendId", (req,res) => {
    let requesterId =req.params.id, reciverId= req.params.newFriendId;

    if(requesterId===reciverId)
    res.json("you can't add your self as a frind of you ^_^");
    
    if(accounts[reciverId - 1] ===undefined)   //note that no need to handle wrong requester id
      res.json("There is no sush  account id to add");

     //   console.log("is "+requesterId+" a frind of  : "+reciverId+" : "+isAFrind(requesterId,reciverId))
    if (isAFrind(requesterId,reciverId)){
    res.json(accounts[reciverId- 1].name + " is your friend alredy ");
    console.log("we reach is a frind is a true")
}
    else
{
   //     console.log("is "+requesterId+" have a frind : "+ isHaveAFrind(requesterId))
        if (!isHaveAFrind(requesterId))
        accounts[requesterId-1].friends.shift();

        accounts[requesterId - 1].friends.push(reciverId)

        if (!isHaveAFrind(reciverId))
        accounts[reciverId-1].friends.shift();

        accounts[reciverId - 1].friends.push(requesterId)
        res.json(accounts[reciverId - 1].name + " is your friend now ");
                //toDoAfter (handle request and accept)
}
}

);

const isAFrind=(id1,id2)=>{
    let result=false;
if(isHaveAFrind(id1))
{
    accounts[id1-1].friends.forEach((frId) => 
    {
    if (frId===id2) 
    result =true;
    });
}
 return result;

}
const isHaveAFrind=(id)=>{
   return (accounts[id-1].friends[0]!=="no friends added yet on this account")
}  
    


module.exports = authRouter;