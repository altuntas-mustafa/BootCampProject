const express = require("express");
const router = express.Router()
const instructors = require('../data/instructors');

// GET localhost:3001/instructors
router.get('/', (_, res) => {
  res.json({instructors})
})

module.exports = router