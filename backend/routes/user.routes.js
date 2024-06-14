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
router.get("/", getUsers);
router.post("/user", upload.single("image"), validateUser, registerUser);

router
  .route("/user/:userId")
  .get(getUser)
  .put(upload.single("image"), updateUser)
  .delete(deleteUser);
module.exports = router;
