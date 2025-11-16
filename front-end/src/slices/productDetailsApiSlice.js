import { PRODUCTS_URL } from "../constants";
import { apiSlice } from "./apiSlice";




export const productDetailsApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getProductDetails:builder.query({
            query:(productId)=>({
                url:`${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor:5
        })
    })
})

export const {useGetProductDetailsQuery} = productDetailsApiSlice