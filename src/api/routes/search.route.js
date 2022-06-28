const { Router } = require("express");
const SearchCtrl = require("../controllers/search.controller");

const router = Router();

router.route("/general").post(SearchCtrl.general_search);

module.exports = router;
