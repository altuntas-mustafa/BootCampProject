const express = require("express");
const router = express.Router()
const bootcamps = require('../data/bootcamps');

// GET localhost:3001/bootcamps
router.get('/', (_, res) => {
  res.json({bootcamps})
})

module.exports = router