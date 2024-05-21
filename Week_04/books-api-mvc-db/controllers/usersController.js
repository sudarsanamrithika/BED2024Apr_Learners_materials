const User = require("../models/user");

const getAllUsers = async (req, res) => {
    try {
        const Users = await User.getAllUsers();
        res.json(Users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving Users");
    }
};

const createUser = async (req, res) => {
    const newUser = req.body;
    try {
      const createdUser = await User.createUser(newUser);
      res.status(201).json(createdUser);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error creating User");
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
}


const getUserById = async (req, res) => {
    const UserId = parseInt(req.params.id);
    try {
        const User = await User.getUserById(Userid);
        if (!User) {
            return res.status(404).send("User NOT FOUND");
        }
        res.json(User);
    } catch (error) {
        console.error(error);
        res.status(500).send("ERROR RETRIEVING User");
    }
};

const updateUser = async (req, res) => {
    const UserId = parseInt(req.params.id);
    const newUserData = req.body;
  
    try {
      const updatedUser = await User.updateUser(UserId, newUserData);
      if (!updatedUser) {
        return res.status(404).send("User not found");
      }
      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error updating User");
    }
  };
  
  const deleteUser = async (req, res) => {
    const UserId = parseInt(req.params.id);
  
    try {
      const success = await User.deleteUser(UserId);
      if (!success) {
        return res.status(404).send("User not found");
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      res.status(500).send("Error deleting User");
    }
  };
  
module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
  };
  
