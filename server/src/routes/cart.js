const cartController = require("../controllers/cart")
const router = require('express').Router();
const {verifyToken} = require("../middleware/auth")

// Thêm sản phẩm vào giỏ hàng từ user
router.post("/", verifyToken, cartController.addToCart)

// get sản phẩm từ giỏ hàng cho user
router.get("/", verifyToken, cartController.getToCartByUser)

// Cập nhật giỏ hàng từ user
router.put("/:id", verifyToken, cartController.updateCartByUser)


module.exports = router
