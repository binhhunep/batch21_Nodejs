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
  });
  return Schema.validate(user);
};
module.exports = checkUser;
