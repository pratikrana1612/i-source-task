const { Router } = require("express");
const validateUser = require("../middleware/userValidation.middleware");
const { upload } = require("../middleware/multer.middleware");

const {
  getUsers,
  registerUser,
  updateUser,
  getUser,
  deleteUser,
} = require("../controller/user.controller");

const router = Router();
// GET /api/users - Get all users
router.get("/", getUsers);
// POST /api/users/user - Register a new user
// This route accepts a POST request to create a new user
// It expects a JSON body with properties name, email, username, password, contact and optionally a profilePic
// It also expects a file named "image" to be attached with the request
// The file will be uploaded and stored in a directory named "public/images"
// The uploaded file path will be saved in the database
router.post("/user", upload.single("image"), validateUser, registerUser);

// Routes for updating and deleting a user by userId
// All these routes are routed to the same handler function
// The handler function is defined in the user.controller.js file
router
  .route("/user/:userId")
  .get(getUser)
  //  Put request accept It expects a JSON body with properties name, email, username, password, contact and optionally a profilePic
  .put(upload.single("image"), validateUser, updateUser)
  .delete(deleteUser);
module.exports = router;
