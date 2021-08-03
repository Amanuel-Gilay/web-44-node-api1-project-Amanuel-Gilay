// BUILD YOUR SERVER HERE
const express = require ('express')

const user = require ('./users')

const server = express()

server.use(express.Json)



server.post ('/api/users', (reg, res) => {
    const { name, bio } = req.bio
    newUser.create ({ name, bio })
           .then( user => {
               res.status(201).Json(user)
           })

           .catch(err => {
            res.status(500).json({ message: err.message })
          })
})



server.get ('api/users/:id', (req, res) => {
    const { id }= req.params

    user.findById(id)
           .then(user => {
               if(!user) {
                   res.status (404).json ({ message: `user ${id} not found`})
               }else {
                res.status(200).json(user)
               }
           })
})



server.delete('api/users/:id', (req, res) => {
    const { id } = req.params
    console.log('about to delete', id)
    // in the afternoon you'll have to getById the dog before
    // proceeding with the deletion!
    user.delete(id)
      .then(deleted => {
        if (!deleted) {
          res.status(404).json({ message: 'not found!' })
        } else {
          res.json(deleted)
        }
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
  })


  server.put('api/users/:id', (req, res) => {
    const { id } = req.params
    const { name, bio } = req.body
    user.update(id, { name, bio })
      .then(updatedDog => {
        if (!updatedUser) {
          res.status(404).json({ message: 'not found!' })
        } else {
          res.json(updatedUser) // defaults to status 200
        }
      })
      .catch(err => {
        res.status(500).json({ message: err.message })
      })
  })


module.exports = server // EXPORT YOUR SERVER instead of {}
