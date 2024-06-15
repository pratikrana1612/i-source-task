const User = require("../models/user.model.js");

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId || "" }).select(
      "-password"
    );
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    // const user = await User.findById(req.params.userId);;
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Create a new user
const registerUser = async (req, res) => {
  console.log(req.body);
  const { name, email, username, password, contact } = req.body;

  // Basic validation
  // if (!name || !email || !password) {
  //   return res.status(400).json({ message: "Please fill all fields" });
  // }

  try {
    const newUser = await User.create({
      name,
      email,
      username,
      password,
      contact,
      profiePic: req.file?.path,
    });
    const userObject = newUser.toObject();
    delete userObject.password;
    res.status(201).json(userObject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a user
const updateUser = async (req, res) => {
  // const updateFields = {};
  // if (req.body.name !== undefined) updateFields.name = req.body.name;
  // if (req.body.email !== undefined) updateFields.email = req.body.email;
  // if (req.body.password !== undefined)
  //   updateFields.password = req.body.password;
  try {
    if (req.file?.path) {
      req.body.profiePic = req.file?.path;
    }
    const password = req.body?.password;
    delete req.body.password;
    const user = await User.findByIdAndUpdate(
      req.params.userId || "",
      req.body,
      {
        new: true,
      }
    ).select("-password");
    //update the password only if the password is entered by the user
    if (password) {
      user.password = password;
      user.save();
    }
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({
      message: "User updated",
      user: user,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId).select(
      "-password"
    );
    console.log("fasdf");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getUsers,
  registerUser,
  updateUser,
  deleteUser,
  getUser,
};
