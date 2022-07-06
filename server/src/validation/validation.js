import Joi from "joi";

const validateUser = (user) => {
  const schema = Joi.object({
    id: Joi.number(),
    name: Joi.string().min(3).max(50).required(),
    age: Joi.number().min(15).max(50).required(),
  });

  return schema.validate(user);
};

module.exports = { validateUser: validateUser };
