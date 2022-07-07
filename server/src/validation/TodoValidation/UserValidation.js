import Joi from "joi";
import { joiPassword } from "joi-password";

const checkUser = (user) => {
  const Schema = Joi.object({
    username: Joi.string().email().required(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfUppercase(1)
      .minOfNumeric(1)
      .noWhiteSpaces()
      .required(),
    first_name: Joi.string().min(1).max(10).required(),
    last_name: Joi.string().required(),
    email: Joi.string().email().required(),
    gender: Joi.valid("Male", "Female", "Non-binary").required(),
    address: Joi.string().min(10).max(100).required(),
    university: Joi.string().min(10).max(100).required(),
    isActive: Joi.boolean().required(),
    createdAt: Joi.date().required(),
  });
  return Schema.validate(user);
};
module.exports = checkUser;
