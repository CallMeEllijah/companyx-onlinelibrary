const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateChangePassInput(data) {
  let errors = {};

  data.password = !isEmpty(data.password) ? data.password : "";

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Old Password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password2 = "Password must be at least 6 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
