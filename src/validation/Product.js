import Joi from "joi";

const validateProduct = (product) => {
  const schema = Joi.object({
    id: Joi.string(),
    name: Joi.string().min(2).max(10).required(),
    description: Joi.string().min(10).max(200),
    price: Joi.number().required(),
    status: { active: Joi.boolean(), inactive: Joi.boolean() },
    date: Joi.string(),
  });

  return schema.validate(product);
};

module.exports = { validateProduct: validateProduct };
