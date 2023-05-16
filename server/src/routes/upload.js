const router = require('express').Router();
const uploadController = require('../controllers/upload')

const upload = require("../../utils/multer");
// Upload ảnh
router.post("/file", upload.single("image"), uploadController.uploadImage)
module.exports = router