import asyncHandler from "../midd/asyncHandler.js";
import Product from "../models/productModel.js";


// @desc    Fetch all products
// @route   GET /api/products

const getAllProducts =asyncHandler(async (req,res)=>{
    const products = await Product.find({})
    res.json(products)

})
// @desc    Fetch single product

const getProductById =asyncHandler(async (req,res)=>{
    const product = await Product.findById(req.params.id)

    if (product) {
        return res.json(product)
    } else {
        throw new Error('Resource not found  ') 
    }

})


export {getAllProducts ,getProductById}