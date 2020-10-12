const accounts = require("./accounts.js");
const controller = require("./controller.js");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const express = require("express");

const authRouter = express.Router();

const passwordHash = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

authRouter.get("/accounts",(req, res) => {
    res.json(accounts);
});

authRouter.post("/sign-up", async (req, res) => {
  const { error } = validateAccount(req.body);
  if (error) return res.status(400).json(error.details[0].message);
  
  const account = {
    id: accounts.length + 1,//auto id generator 
    name: req.body.name,
    email: req.body.email,
    password: await passwordHash(req.body.password),
  };
  accounts.push(account);
  res.json(account);
});

authRouter.put("/change-account-name/:id", (req, res) => {
  const account = accounts.find((account) => account.id === parseInt(req.params.id));
  if (!account) return res.status(404).json("The account with the given ID was not found.");

  const { error } = validateAccountName(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  account.name = req.body.name;
  res.json(account);
});

authRouter.put("/change-account-email/:id", (req, res) => {
  const account = accounts.find((account) => account.id === parseInt(req.params.id));
  if (!account) return res.status(404).json("The account with the given ID was not found.");

  const { error } = validateAccountEmail(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  account.email = req.body.email;
  res.json(account);
});

authRouter.put("/change-account-password/:id", async (req, res) => {
  const account = accounts.find((account) => account.id === parseInt(req.params.id));
  if (!account) return res.status(404).json("The account with the given ID was not found.");

  const { error } = validateAccountPassword(req.body);
  if (error) return res.status(400).json(error.details[0].message);

  account.password = await passwordHash(req.body.password);
  res.json(account);
});

authRouter.delete("/remove-account/:id/:password", async (req, res) => {
  const account = accounts.find((account) => account.id === parseInt(req.params.id));
  if (!account) return res.status(404).json("The account with the given ID was not found.");

  const hash = await passwordHash(req.params.password);
  const password = await bcrypt.compare(account.password, hash);
  if(!password) return res.status(400).json("Invalid account password.");
  
  const index = accounts.indexOf(account);
  accounts.splice(index, 1);
  res.json(account);
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
  };
  return Joi.validate(account, schema);
};

const validateAccountEmail = (account) => {
  const schema = {
    email: Joi.string().min(3).required(),
  };
  return Joi.validate(account, schema);
};

const validateAccountPassword = (account) => {
  const schema = {
    password: Joi.string().min(5).required(),
  };
  return Joi.validate(account, schema);
};

module.exports = authRouter;
