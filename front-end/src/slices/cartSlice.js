import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState =  localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) :{cartItems:[]}



const addDecimals =(num)=> {
return Math.round((num * 100 ) / 100 ).toFixed(2)
}



const cartSlice=createSlice({
    name:'cart',
    initialState,
    reducers:{
        addToCart:(state , action)=>{
        const item = action.payload

            const existItem =state.cartItems.find((itemfromcart)=> itemfromcart._id === item._id)
            if(existItem){
                state.cartItems=state.cartItems.map((itemfromcart)=>itemfromcart._id === existItem._id ? 
             item : itemfromcart)
            }else {
                state.cartItems=[...state.cartItems , item]
            }

            return updateCart(state)


        },
        removeFromCart:(state,action)=>{
            state.cartItems=state.cartItems.filter((i)=> i._id !== action.payload)
            return updateCart(state)
        }

    }
})

export const {addToCart , removeFromCart} =cartSlice.actions

export default cartSlice.reducer