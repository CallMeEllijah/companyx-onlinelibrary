const express = require("express");
const router = express.Router();

const Log = require("../../models/Log");

router.post("/createLog", (req, res) => {
  const newLog = new Log({
      log: req.body.log
  });

  newLog.save().then(log => {
    res.json(log)
  }).catch(err => {
    res.status(400).send("failed to save new todo");
  });

});

router.get("/getLogs", (req, res) => {

    Log.find({ }, 'log').then(logs => {
      if (!logs.length) {
        return res.status(400).json({logs: "logs no exist"});
      } else {
        return res.json(logs);
      }
    })
});

module.exports = router;