const express = require('express');
const router = express.Router();
const { getProducts } = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");

// ADD ADMIN MIDDLEWQAREEEEEEEEEEEEEEEEEEEEEEEEE
// UPLOAD PRODUCT
router.get('/products',authMiddleware, getProducts);


module.exports = router;