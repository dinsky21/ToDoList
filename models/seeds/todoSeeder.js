const bcrypt = require('bcryptjs')

const Todo = require('../todo')
const User = require('../user')
const db = require('../../config/mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ override: true })
}

const SEED_USER = {
  name: 'root',
  email: 'root@root.com',
  password: '1234',
}

db.once('open', () => {
  const email = SEED_USER.email
  // User.findOne({ email })
  //   .then((user) => {
  //     if (user) {
  //       process.exit()
  //     }
  //   })
  //   .then(
  bcrypt
    .genSalt(10)
    .then((salt) => bcrypt.hash(SEED_USER.password, salt))
    .then((hash) =>
      User.create({
        name: SEED_USER.name,
        email,
        password: hash,
      })
    )
    // )
    .then((user) => {
      const userId = user._id
      return Promise.all(
        Array.from({ length: 10 }, (_, i) =>
          Todo.create({ name: `name-${i}`, userId })
        )
      )
    })
    .then(() => {
      console.log('done')
      process.exit()
    })
})
