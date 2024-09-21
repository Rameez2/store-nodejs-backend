const express = require('express');
const router = express.Router();
const { AdminGetProducts, AdminUploadProduct, AdminUpdateProduct,AdminDeleteProduct } = require("../../controllers/adminControllers/AdminProductControllers");
const authMiddleware = require("../../middlewares/authMiddleware");
const isAdmin = require("../../middlewares/isAdminMiddleware");

// UPLOAD PRODUCT
router.get('/product',authMiddleware,isAdmin, AdminGetProducts);
router.post('/product',authMiddleware,isAdmin, AdminUploadProduct);
router.put('/product',authMiddleware,isAdmin, AdminUpdateProduct);
router.delete('/product/:id',authMiddleware,isAdmin, AdminDeleteProduct);


module.exports = router;