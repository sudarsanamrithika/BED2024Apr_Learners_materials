const User = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const user = await User.getAllUsers();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving users");
  }
};

const getUserById = async (req, res) => {
  const userId = parseInt(req.params.id);
  try {
    const user = await User.getUserById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving user");
  }
};

const createUser = async (req, res) => {
  const newUser = req.body;
  try {
    const createdUser = await User.createUser(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
};

const updateUser = async (req, res) => {
  const userId = parseInt(req.params.id);
  const updatedUser = req.body;

  try {
    const updatedUserData = await User.updateUser(userId, updatedUser);
    if (!updatedUserData) {
      return res.status(404).send("User not found");
    }
    res.json(updatedUserData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating user");
  }
};

const deleteUser = async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const success = await Book.deleteUser(userId);
    if (!success) {
      return res.status(404).send("User not found");
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting user");
  }
};

async function searchUsers(req, res) {
    const searchTerm = req.query.searchTerm; // Extract search term from query params
  
    try {
      const userController = new User();
      const users = await User.searchUsers(searchTerm);
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error searching users" });
    }
};

async function getUsersWithBooks(req, res) {
    try {
        const users = await User.getUsersWithBooks();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users with books" });
    }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  searchUsers,
  getUsersWithBooks,
};