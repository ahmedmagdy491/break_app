const router = require("express").Router();
const { generateAccessToken } = require("../services/agora");

router.route("/agora_access_token").get(generateAccessToken);

module.exports = router;
