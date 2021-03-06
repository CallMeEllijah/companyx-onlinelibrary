const Validator = require("validator");
const isEmpty = require("is-empty");

//rename later to book

module.exports = function validateBookInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.title = !isEmpty(data.title) ? data.title : "";
  data.authors = !isEmpty(data.authors) ? data.authors : "";
  data.year = !isEmpty(data.year) ? data.year : "";
  data.isbn = !isEmpty(data.isbn) ? data.isbn : "";
  data.callno = !isEmpty(data.callno) ? data.callno : "";

  // title checks
  if (Validator.isEmpty(data.title)) {
    errors.title = "Title field is required";
  }

  // authors checks
  if (Validator.isEmpty(data.authors)) {
    errors.authors = "Authors field is required";
  }

  //year of pub check
  if (Validator.isEmpty(data.year)) {
    errors.year = "Year of Publication field is required";
  }

  // isbn check
  if (Validator.isEmpty(data.isbn)) {
    errors.isbn = "ISBN field is required";
  }
  if (!Validator.isLength(data.isbn, { min: 13, max: 13 }) && !Validator.isEmpty(data.isbn)) {
    errors.isbn = "ISBN must be 13 numbers";
  }

  // callno checks
  if (Validator.isEmpty(data.callno)) {
    errors.callno = "Call Number field is required";
  }
  if (!Validator.isLength(data.callno, { min: 3, max: 3 }) && !Validator.isEmpty(data.callno)) {
    errors.callno = "Call Number must be 3 numbers, please refer to Dewey Decimal Classification";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};