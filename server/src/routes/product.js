const router = require('express').Router();
const ProductController = require('../controllers/product');
const {verifyTokenAndAdmin} = require("../middleware/auth");

// Thêm sản phẩm, Chỉ admin mới có quyền
router.post("/", verifyTokenAndAdmin ,ProductController.createProduct)
// Filter sản phẩm
router.post("/search", ProductController.getAllProduct)
// Get sản phẩm theo id
router.get("/:id", ProductController.getProductByID)
// Xóa sản phẩm theo id, Chỉ admin mới có quyền
router.delete("/:id", verifyTokenAndAdmin ,ProductController.deleteProduct)
// Sửa sản phẩm theo id, Chỉ admin mới có quyền
router.put("/:id", verifyTokenAndAdmin, ProductController.updateProduct)
module.exports = router
