const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {})

router.get('/register', (req, res) => {
  res.render('register')
})

module.exports = router
