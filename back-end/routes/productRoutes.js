import express from 'express'
import { getProductById,getAllProducts } from '../controller/productController.js'

const router = express.Router()

// @desc    Fetch all products
// @route   GET /api/products
router.route('/').get(getAllProducts)

// @desc    Fetch single product

router.route('/:id').get(getProductById)


export default router
