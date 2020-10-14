const accounts = require("./accounts.js");
const express = require("express");

const authRouter = express.Router();

authRouter.get("/frinds/:id", (req,res) => {
    console.log("frinds hit")
    res.json(accounts[req.params.id - 1].frinds);
    
    
});


authRouter.put("/add-new-frind/:id/:newFrindId", (req,res) => {
    

    if(accounts[req.params.newFrindId - 1] ===undefined)
      res.json("There is no sush  account id to add");
     //TODO: handle existing frinds also 
     else
     //forEach(accounts[req.params.id-1].frinds)
     //===undefined)
        
            accounts[req.params.id - 1].frinds.push(req.params.newFrindId)
        accounts[req.params.newFrindId - 1].frinds.push(req.params.id)
        res.json(accounts[req.params.newFrindId - 1].name + " is your frind now ");
         //toDoAfter (handle request and accept)

         
//         }else
//         res.json(accounts[req.params.newFrindId - 1].name + " is your frind aredy ");
//      }
//     console.log( accounts[req.params.id - 1].frinds[accounts[req.params.newFrindId - 1]])
 
});

module.exports = authRouter;