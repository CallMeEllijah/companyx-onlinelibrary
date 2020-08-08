const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateChangePassInput = require("../../validation/changepass");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({$or:[{email: req.body.email},{username:req.body.username},{IDno: req.body.IDno}]}).then(user => {
    if (user) {
      if(req.body.email == user.email && req.body.username == user.username && req.body.IDno == user.IDno)
        return res.status(400).json({username: "username exists", email: "email exists", IDno: "ID num exists"});
      else if(req.body.email == user.email && req.body.username == user.username)
        return res.status(400).json({username: "username exists", email: "email exists"});
      else if(req.body.IDno == user.IDno && req.body.username == user.username)
        return res.status(400).json({IDno: "idno exists", email: "email exists"});
      else if(req.body.email == user.email && req.body.IDno == user.IDno)
        return res.status(400).json({username: "username exists", IDno: "idno exists"});
      else if (req.body.email == user.email)
        return res.status(400).json({email: "email exists"});
      else if (req.body.username == user.username)
        return res.status(400).json({username: "username exists"});
      else if (req.body.IDno == user.IDno)
        return res.status(400).json({username: "IDno exists"});
      else
        return res.status(400).json({error: "wtf"});
    } else {
      const newUser = new User({
        fName: req.body.fName,
        lName: req.body.lName,
        username: req.body.username,
        IDno: req.body.IDno,
        email: req.body.email,
        password: req.body.password,
        secQ: req.body.secQ,
        secA: req.body.secA,
        uType: req.body.uType
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//changePassword
router.post("/changePassword", (req, res) => {
  const { errors, isValid } = validateChangePassInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  if(req.body.password == req.body.password2){
    return res
      .status(400)
      .json({samepassword: "Your old and new password cannot be similar"})
  }

  User.findOne({ email: req.body.email }).then(user => {
      bcrypt.compare(req.body.password, user.password).then(isMatch => {
      if(isMatch){
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password2, salt, (err, hash) => {
            if (err) throw err;
              req.body.password2 = hash;
              user
                .updateOne({"password":req.body.password2}, {upsert : true})
                .then(user => res.json(user))
                .catch(err => console.log(err));
          });
        });
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Old password incorrect" });
      }
    });
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
    console.log(req.body)
  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          fName: user.fName,
          lName: user.lName,
          IDno: user.IDno,
          email: user.email,
          username: user.username,
          uType: user.uType
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 24*60*60 // 1 day
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

router.post("/deleteUser", (req, res) => {
  User.deleteOne({ email: req.body.email }).then(res => {return res.status(200)}).catch(err => {return res.status(400)});
});

module.exports = router;
