// BUILD YOUR SERVER HERE

const express = require('express');
const User = require('./users/model');
const server = express();

server.use(express.json());

server.post('/api/users', (req, res) => {
  const user = req.body;
  if (!user.name || !user.bio) {
    res.status(400).json({
      message: 'You have no name'
    })
  } else {
    User.insert(user).then(createdUser => {
      res.status(201).json(createdUser)
    })
    .catch(err => {
      res.status(500).json({
        message: 'Uncreated.',
        err: err.message,
        stack: err.stack,
      })
    })
  }
});

server.get('/api/users', (req, res) => {
  User.find().then(users => {
    res.json(users)
  })
  .catch(err => {
    res.status(500).json({
      message: "Couldn't get user",
      err: err.message,
      stack: err.stack,
    })
  })
});

server.get('/api/users/:id', (req, res) => {
  User.findById(req.params.id).then(user => {
    if(!user){
      res.status(404).json({
        message: 'No one with that ID',
      })
    }
    console.log(user)
    res.json(user)
  })
    .catch(err => {
      console.log(err)
      res.status(500).json({ 
        message: 'Who?',
        err: err.message })
    })
});

server.delete('/api/users/:id', async (req, res ) => {
  try {
    const userDelete = await User.findById(req.params.id)
    if (!userDelete) {
      res.status(404).json({
        message: 'No such person here',
      })
    } else {
      const userdelete = await User.remove(userDelete.id)
      res.status(200).json(userdelete)
    }
  } catch (err) {
    res.status(500).json({
      message: "Couldn't get rid of 'em.",
      err: err.message,
      stack: err.stack
    })
  }
});

server.put('/api/users/:id', async (req, res) => {
  try {
    const possibleUser = await User.findById(req.params.id);
    if (!possibleUser) {
      res.status(404).json({
        message: 'Nope'
      })
    } else {
      if (!req.body.name || !req.body.bio) {
      res.status(400).json({
        message: 'Your name and bio suck.',
      })
      } else {
        const updatedUser = await User.update(req.params.id, req.body)
        res.status(200).json(updatedUser)
      }
    }
    } catch (err) {
      res.status(500).json({
        message: 'Could not update.',
        err: err.message,
        stack: err.stack,
      })
    }
});

module.exports = server; 
