const router = require('express').Router();
const CategoryController = require('../controllers/category')
const {verifyTokenAndAdmin} = require("../middleware/auth")

// Thêm danh mục sản phẩm, Chỉ admin mới có quyền
router.post("/", verifyTokenAndAdmin, CategoryController.createCategory)

//  Get tất cả danh mục sản phẩm
router.get("/", CategoryController.getAllCategory)

//  Xóa danh mục sản phẩm theo id, Chỉ admin mới có quyền
router.delete('/:id', verifyTokenAndAdmin, CategoryController.deleteCategory)

//  Sửa danh mục sản phẩm, Chỉ admin mới có quyền
router.put('/:id', verifyTokenAndAdmin, CategoryController.updateCategory)
module.exports = router
