const express = require('express');
const router = express.Router();
const { AdminGetUsers, AdminUpdateUser, AdminDeleteUser } = require("../../controllers/adminControllers/AdminUserControllers");
// const { AdminGetUsers, AdminUploadProduct, AdminUpdateProduct,AdminDeleteProduct } = require("../../controllers/adminControllers/AdminProductControllers");
const authMiddleware = require("../../middlewares/authMiddleware");
const isAdmin = require("../../middlewares/isAdminMiddleware");

// UPLOAD PRODUCT
router.get('/user',authMiddleware,isAdmin, AdminGetUsers);
router.put('/user',authMiddleware,isAdmin, AdminUpdateUser);
router.delete('/user/:id',authMiddleware,isAdmin, AdminDeleteUser);

module.exports = router;