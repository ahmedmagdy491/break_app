let StoreDAO = require("../../dao/store.dao");

class StoreController {
  static async addProduct(req, res, next) {
    try {
      const proudctResult = await StoreDAO.addProduct(req.body);
      res.status(201).json({
        success: true,
        result: proudctResult,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addCategory(req, res, next) {
    try {
      const categoryResult = await StoreDAO.addCategory(req.body);
      res.status(201).json({
        success: true,
        result: categoryResult,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCategoryProducts(req, res, next) {
    try {
      const result = await StoreDAO.getCategoryProducts(
        req.params.category_id,
        req.query.page
      );
      res.json({
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCategories(req, res, next) {
    try {
      const result = await StoreDAO.getCategories(req.query.page);
      res.json({
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getCategoriesNoPagination(req, res, next) {
    try {
      const result = await StoreDAO.getCategoriesNoPagination();
      res.json({
        result,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateProduct(req, res, next) {
    try {
      await StoreDAO.updateProduct({
        id: req.params.id,
        ...req.body,
      });
      res.json({
        result: "done",
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateCategory(req, res, next) {
    try {
      await StoreDAO.updateCategory({
        id: req.params.id,
        ...req.body,
      });
      res.json({
        result: "done",
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      await StoreDAO.deleteCategory(req.params.id);
      res.json({
        result: "done",
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteProduct(req, res, next) {
    try {
      await StoreDAO.deleteProduct(req.params.id);
      res.json({
        result: "done",
      });
    } catch (error) {
      next(error);
    }
  }
  static async findOneProduct(req, res, next) {
    try {
      const result = await StoreDAO.findOneProduct(req.params.id);
      res.json({
        result,
      });
    } catch (error) {
      next(error);
    }
  }
  static async findOneCategory(req, res, next) {
    try {
      const result = await StoreDAO.findOneCategory(req.params.id);
      res.json({
        result,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StoreController;
