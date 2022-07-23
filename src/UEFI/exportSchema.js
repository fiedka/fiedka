import Joi from "joi";

const removal = Joi.object({
  guid: Joi.string(),
  name: Joi.string(),
});

export default Joi.object({
  removals: Joi.array().items(removal).required(),
});
