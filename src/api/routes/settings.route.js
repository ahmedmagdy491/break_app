const SettingsController = require("../controllers/settings.controller");

const router = require("express").Router();

router.route("/createSettings").post(SettingsController.CreateSettings);
router.route("/").get(SettingsController.GetSettings);
router.route("/editSettings/:id").put(SettingsController.EditOnSettings);

module.exports = router;
