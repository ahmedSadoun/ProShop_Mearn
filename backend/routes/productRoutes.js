import express from 'express'
const router = express.Router();
import { findProducts, findProductByID } from '../controllers/productController.js'
//@desc Fetch all products 
//@route GET /api/products
//@access Public
router.route('/').get(findProducts)
 //@desc Fetch single products 
//@route GET /api/products/:id
//@access Public
router.route('/:id').get( findProductByID)
export default router;