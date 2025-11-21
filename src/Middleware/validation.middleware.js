import joi from "joi";

export const validation = (schema) => {
  return (req, res, next) => {
    let validationErrors = [];
    const methods = ["headers", "body", "params", "query"];
    for (const key of methods) {
      if (schema[key]) {
        const validationResult = schema[key].validate(req[key], {
          abortEarly: false,
        });
        if (validationResult.error) {
          validationErrors.push({
            message: "validation Error",
            details: validationResult.error.details,
          });
        }
      }
    }
    if (validationErrors.length > 0) {
      return res
        .status(400)
        .json({ message: "validation Error", error: validationErrors });
    }
    next();
  };
};

export const generalField = {
  name: joi.string().min(3).max(20).messages({
    "string.min": "Name must be a most 3 Charcters long",
    "string.max": "Name must be a least 3 Charcters long",
  }),
  email: joi.string().email({
    minDomainSegments: 2,
    maxDomainSegments: 5,
    tlds: { allow: ["com", "net", "org", "edu", "io"] },
  }),
  password: joi.string().min(6),
  passwordConfirm: joi.string().valid(joi.ref("password")).required(),
  otp: joi.string().min(6).max(6),
};
