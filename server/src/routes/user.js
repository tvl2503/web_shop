const router = require('express').Router();
const UserController = require('../controllers/users')
const {verifyToken, verifyTokenAndAdmin} = require("../middleware/auth")

// Đăng ký tài khoản
router.post('/register',UserController.createUser)                   
// Đăng nhập
router.post('/login',UserController.loginUser) 
// Get thông tin user
router.get('/me', verifyToken, UserController.getMe )

module.exports = router