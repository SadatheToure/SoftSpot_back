var express = require('express')
var knex = require('../knex')
var router = express.Router()

// Get all users
router.get('/', function (req, res) {
  knex.select('username.name', 'username.bio')
    .from('username')
    .then( data => {
      res.json(data)
    })
})

// Get user by id, with that user's skills and reviews
router.get('/:id', function (req, res) {
  let userId = req.params.id
  knex.select('username.name', 'username.img', 'username.bio')
    .from('username')
    .where('username.id', userId)
    .then( function (data) {
      res.json(data)
    })
})


// Get all reviews by a particular user
router.get('/:id/reviews', function (req, res) {
  let userId = req.params.id
  knex.select('review.id', 'review.title', 'review.body', 'review.rating', 'review.username_id', 'review.tech_id')
    .from('review')
    .where('username.id', userId)
    .join('username', function () {
      this.on('username.id', 'review.username_id')
    })
    .then( function (data) {
      res.json(data)
    })
})

// Get all skills of a particular user
router.get('/:id/skills', function (req, res) {
  let userId = req.params.id
  knex.select('skill.id', 'skill.name', )
    .from('username')
    .where('username.id', userId)
    .join('skill_user', function () {
      this.on('username.id', 'skill_user.username_id')
    })
    .join('skill', function () {
      this.on('skill_user.skill_id', 'skill.id')
    })
    .then( function (data) {
      res.json(data)
    })
})


module.exports = router
