const {validateAccountName,validateAccountEmail,validateAccountPassword} = require("./validator");
const accounts = require("./accounts.js");
const bcrypt = require("bcrypt");
const express = require("express");

const authRouter = express.Router();

const passwordHash = async (password) => {
  return await bcrypt.hash(password, Number(process.env.SALT));
};

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
  if (!password) return res.status(400).json("Invalid account password.");

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


module.exports = authRouter;

