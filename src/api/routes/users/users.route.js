const { Router } = require("express");

const { UserController } = require("../../controllers/users/users.controller");
const validate = require("../../helpers/validationLayers/user.layer");
const auth = require("../../middlewares/auth.middleware");
const { catchValidationError } = require("../../middlewares/validationError");

const router = Router();
const multer = require("multer");
const { uploadImage } = require("../../utils/firebase");

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: 1024 * 1024,
});
router.route("/getUsers").get(auth, UserController.getUsers);
router
  .route("/uploadAvatar")
  .post(Multer.single("avatar"), uploadImage, (req, res) => {
    res.send({ avatarUrl: req.file.firebaseUrl });
  });
router
  .route("/register")
  .post(validate("addUser"), catchValidationError, UserController.register);
router
  .route("/login")
  .post(validate("loginUser"), catchValidationError, UserController.login);

router.route("/delete/:id").delete(UserController.delete);

router.route("/logout").post(auth, UserController.logout);

router.route("/follow").post(auth, UserController.FollowSomeOne);

router.route("/unfollow").post(auth, UserController.UnfollowSomeOne);

router.route("/get_followers").get(auth, UserController.getFollowers);

router.route("/buy_product").post(auth, UserController.buyProduct);

router.route("/send_gift").post(auth, UserController.sendGift);

router.route("/convert_currence").post(auth, UserController.convertCurrence);

router.route("/getUserProfile").get(auth, UserController.getUserProfile);

router.route("/updateProfile").put(auth, UserController.updateProfile);
router.route("/updateUser/:key").put(auth, UserController.updateUser);
router.route("/getMyProfile").get(auth, UserController.getMyProfile);
router.route("/getUser/:email").get(auth, UserController.getUser);
router.route("/getUserById/:id").get(auth, UserController.getUserById);

module.exports = router;
