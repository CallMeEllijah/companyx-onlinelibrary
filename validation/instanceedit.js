const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateInstanceEditInput(data) {

  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.status = !isEmpty(data.status) ? data.status : "";

  if (Validator.isEmpty(data.status)) {
    errors.status = "Status field is required";
  }
  if (data.status !== "available" && data.status !== "borrowed") {
    errors.status = "Error, must be { 'borrowed', 'available' } only";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}
