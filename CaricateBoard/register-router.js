const accounts = require("./accounts.js");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");

const authRouter = express.Router();

const passwordHash = async (password) => {
    return await bcrypt.hash(password, Number(process.env.SALT));  
};

authRouter.get("/accounts", async (req, res) => {
    if(accounts.length === 0) return res.json("There is no accounts");
    res.json(accounts);
});

authRouter.post("/signUp", async (req, res) => {
  const exist = accounts.find(account => account.email === req.body.email);
  if(exist) return res.status(400).json("User is already exist");
  const { error } = validateAccount(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  
  const account = {
    id: accounts.length + 1,
    name: req.body.name,
    email: req.body.email,
    password: await passwordHash(req.body.password),
    posts:[ 
  
    ],
    friends:[

    ]
  };
  
  if(account.posts.length === 0) account.posts[account.id - 1] = "no posts shared yet on this account";
  if(account.friends.length === 0) account.friends[account.id - 1] = "no friends added yet on this account";

  accounts.push(account);
  res.json(account);  
});

authRouter.post("/login", async (req,res) => {
    const account = accounts.find(user => user.email === req.body.email);
    if(!account) return res.status(400).json("Invalid Email");
    
    
    const password = await bcrypt.compare(req.body.password, account.password);
    if(!password) return res.status(400).json("Invalid Password");

    if (account.posts.length === 0) account.posts[account.id - 1] = "no posts shared yet on this account";
    if (account.friends.length === 0) account.friends[account.id - 1] = "no friends added yet on this account";
    
    res.json("login successfully");
});

authRouter.put("/change-account-name/:id", async (req, res) => {
  const account = accounts.find((account) => account.id === parseInt(req.params.id));
  if (!account) return res.status(404).json("The account with the given ID was not found.");

  const { error } = validateAccountName(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const password = await bcrypt.compare(req.body.password, account.password);
  if (!password) return res.status(400).json("Invalid account password.");

  if (account.posts.length === 0) account.posts = "no posts shared yet on this account";

  account.name = req.body.name;
  res.json(account);
});

authRouter.put("/change-account-email/:id", async (req, res) => {
  const account = accounts.find((account) => account.id === parseInt(req.params.id));
  if (!account) return res.status(404).json("The account with the given ID was not found.");

  const { error } = validateAccountEmail(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  const password = await bcrypt.compare(req.body.password, account.password);
  if(!password) return res.status(400).json("Invalid account password.");
  
  if (account.posts.length === 0) account.posts = "no posts shared yet on this account";

  account.email = req.body.email;
  res.json(account);
});

authRouter.put("/change-account-password/:id", async (req, res) => {
  const account = accounts.find((account) => account.id === parseInt(req.params.id));
  if (!account) return res.status(404).json("The account with the given ID was not found.");
  
  const { error } = validateAccountPassword(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  
  const password = await bcrypt.compare(req.body.oldPassword, account.password);
  if (!password) return res.status(400).json("Invalid account password.");

  if (account.posts.length === 0) account.posts = "no posts shared yet on this account";

  account.password = await passwordHash(req.body.password);
  res.json(account);
});

authRouter.delete("/remove-account/:id", async (req, res) => {
  const account = accounts.find((account) => account.id === parseInt(req.params.id));
  if (!account) return res.status(404).json("The account with the given ID was not found.");

  const password = await bcrypt.compare(req.body.password, account.password);
  if(!password) return res.status(400).json("Invalid account password.");
  
  const index = accounts.indexOf(account);
  accounts.splice(index, 1);
  res.json("account has been deleted successfully");
});

const validateAccount = (account) => {
  const schema = {
    name: Joi.string().min(3).required(),
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(5).required(),
  };
  return Joi.validate(account, schema);
};

const validateAccountName = (account) => {
  const schema = {
    name: Joi.string().min(3).required(),
    password: Joi.string().min(5).required(),
  };
  return Joi.validate(account, schema);
};

const validateAccountEmail = (account) => {
  const schema = {
    email: Joi.string().min(3).required().email(),
    password: Joi.string().min(5).required(),
  };
  return Joi.validate(account, schema);
};

const validateAccountPassword = (account) => {
  const schema = {
    password: Joi.string().min(5).required(),
    oldPassword: Joi.string().min(5).required(),
  };
  return Joi.validate(account, schema);
};

module.exports = authRouter;
