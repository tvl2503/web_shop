const router = require('express').Router();
const StripeController = require('../controllers/stripe')
const {verifyToken, verifyTokenAndAdmin} = require("../middleware/auth")
const bodyParser = require('body-parser')

// Tạo thanh toán 
router.post("/", verifyToken, StripeController.createCheckout )

// Khi thanh toán online thành công, thì cập nhật trạng thái thanh toán vào giỏ hàng
router.post("/webhook", bodyParser.raw({type: 'application/json'}), StripeController.webhook)

module.exports = router
