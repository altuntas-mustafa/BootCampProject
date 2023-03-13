const express = require("express");
const router = express.Router()
const developers = require('../data/developers');
const Joi = require('joi');
const { v4: uuidv4 } = require("uuid");

/**
 * Initial population of developers from the json file
 * The `developersArr` is in-memory, so it is destroyed on
 * server restart.
 */
let developersArr = [...developers];

const addDeveloperSchema = Joi.object().keys({ 
  name: Joi.string().min(3).max(30).required(),
  bootcampId: Joi.string().uuid().required()
}); 

// GET localhost:3001/developer
router.get('/', (_, res) => {
  res.json({developers: developersArr})
})

// POST localhost:3001/developer
router.post('/', (req, res) => {
  const result = addDeveloperSchema.validate(req.body);
  const { error } = result; 
  const valid = error == null; 
  if (!valid) { 
    return res.status(400).json({ 
      message: 'Bad Request', 
      error
    }) 
  }
  const newDev = {
    name: req.body.name,
    id: uuidv4(),
    bootcampId: req.body.bootcampId
  }
  developersArr.push(newDev)
  res.send({
    developer: newDev
  })
})

// DELETE localhost:3001/developers
router.delete('/:id', (req, res) => {
  const developerId = req.params.id;
  const developerToDelete = developersArr.find((dev) => {
    return dev.id === developerId;
  })
  if (!developerToDelete) { 
    return res.status(404).json({ 
      error: 'Developer with the provided Id not found', 
    }) 
  }
  developersArr = developersArr.filter((dev) => {
    return dev.id !== developerId;
  })
  res.send({
    developer: developerToDelete
  })
})

module.exports = router