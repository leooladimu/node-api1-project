// BUILD YOUR SERVER HERE
const express = require("express"); 
const Users = require("./users-model.js");

const server = express();

server.use(express.json());

server.post("/api/users", async (req, res) => {
  try {
    const newUser = await Users.create(req.body).insert();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

server.get("/api/users", async (req, res) => {
  try {
    const users = await Users.initializeUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

server.get("/api/users/:id", async (req, res) => {
  try {
    const user = await Users.findById();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

server.delete("/api/users/:id", async (req, res) => {
  try {
    const deletedUser = await Users.findById().remove();
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

server.put("/api/users/:id", async (req, res) => {
  try {
    const updatedUser = await Users.update(req.body);
    res.status(201).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
