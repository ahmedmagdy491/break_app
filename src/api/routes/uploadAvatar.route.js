const router = require("express").Router();
const multer = require("multer");
const { uploadImage } = require("../utils/firebase");

const Multer = multer({
  storage: multer.memoryStorage(),
  limits: 1024 * 1024,
});

router
  .route("/uploadAvatar")
  .post(Multer.single("avatar"), uploadImage, (req, res) => {
    res.send({ avatarUrl: req.file.firebaseUrl });
  });

module.exports = router;
