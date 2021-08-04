// BUILD YOUR SERVER HERE
const express = require ('express')
const user = require ('./users/model')
const server = express()


server.put('api/user:id',async (req, res) => {
    try {
    const posibleUser = await user.findById(req.params.id)
    if(posibleUser) {
        res.status(200).json ({
            message: 'The user with the specified ID does not exist',
        })
     }else {
        if(!req.body.name || req.body.bio) {
            res.status(404).json({
                message: 'please provide name and bio for the user',
            })
        }else {
            const updatedUser = await User.update(
                req.params.id,
                req.body,
            )
            res.status(200).json(updatedUser)
        }
    }

} catch(err) {
    res.status(500).json({
        message: 'err updating user',
        err: err.message,
        stack: err.stack
    })
}

})



server.delete('api/users:id', async (req, res) => {
   try {
    const posibleUser = await user.findById(req.params.id)
    if(posibleUser) {
        res.status(200).json ({
            message: 'The user with the specified ID does not exist'
        })
    }else {
        const deleteUser = await User.remove(posibleUser.id)
        res.status(200).json(deleteUser)
    }
   }catch(err) {
    res.status(500).json({
        message: 'error deleting user',
        err: err.message,
        stack:err.stack
    })

   }
})

server.post ('/api/users', (reg, res) => {
    const user = req.body;
    if(!user.name || !user.bio) {
        res.status(400).json({
            message: 'please provide name and bio for the user',
        })
    } else {
        user.insert(user)
            .then(createUser =>{
                res.status(201).json(createUser)
            })
            .catch(err=>{
                res.status(500).json({
                    message: 'error creating user',
                    err: err.message,
                    stack:err.stack
                })
            })
    }

          
})


server.get('/api/users', (req, res)=>{
    user.find()
        .then(users => {
            res.json(users)
        })
        .catch(err=>{
            res.status(500).json({
                message: 'error getting users',
                err: err.message,
                stack:err.stack
            })
        })
})

server.get ('api/users/:id', (req, res) => {
   user.findById(req.params.id)
          .then(user => {
             res.json(user)
          })
          .catch(err=>{
           res.status(500).json({
               message: 'error getting user',
               err: err.message,
               stack:err.stack
           })
       })
})



server.use('*',(req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})



module.exports = server // EXPORT YOUR SERVER instead of {}
