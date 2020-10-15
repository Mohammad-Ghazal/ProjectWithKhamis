const Joi = require("joi");


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


module.exports = {
    validateAccount,
    validateAccountName,
    validateAccountEmail,
    validateAccountPassword
}