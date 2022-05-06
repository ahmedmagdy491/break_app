const StoreController = require("../controllers/store.controller");

const router = require("express").Router();

router.route("/addProduct").post(StoreController.addProduct);
router
  .route("/category")
  .post(StoreController.addCategory)
  .get(StoreController.getCategories);

router.route("/allCategories").get(StoreController.getCategoriesNoPagination);
router
  .route("/getCategoryProducts/:category_id")
  .get(StoreController.getCategoryProducts);

router.route("/updateProduct/:id").put(StoreController.updateProduct);
router.route("/deleteProduct/:id").delete(StoreController.deleteProduct);
router.route("/getOneProduct/:id").get(StoreController.findOneProduct);

router.route("/updateCategory/:id").put(StoreController.updateCategory);
router.route("/deleteCategory/:id").delete(StoreController.deleteCategory);
router.route("/getOneCategory/:id").get(StoreController.findOneCategory);

module.exports = router;
