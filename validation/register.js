const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.fName = !isEmpty(data.fName) ? data.fName : "";
  data.lName = !isEmpty(data.lName) ? data.lName : "";
  data.username = !isEmpty(data.username) ? data.username : "";
  data.IDno = !isEmpty(data.IDno) ? data.IDno : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.secQ = !isEmpty(data.secQ) ? data.secQ : "";
  data.secA = !isEmpty(data.secA) ? data.secA : "";

  // Name checks
  if (Validator.isEmpty(data.fName)) {
    errors.fName = "First Name field is required";
  }
  if (Validator.isEmpty(data.fName)) {
    errors.lName = "Last Name Name field is required";
  }
  
  //username
  if (Validator.isEmpty(data.username)) {
    errors.username = "Username field is required";
  }

  //id number
  if (Validator.isEmpty(data.IDno)) {
    errors.IDno = "ID number field is required";
  }
  
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

   //security question and answer
  if (Validator.isEmpty(data.secQ)) {
    errors.secQ = "Security Question field is required";
  }
  if (Validator.isEmpty(data.secA)) {
    errors.secA = "Secirtoy Answer field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};