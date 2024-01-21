// import {createSlice} from '@reduxjs/toolkit'
// const initialState={
//   productsInCart:localStorage.getItem('productsInCart') ? JSON.parse(localStorage.getItem('productsInCart')) :[]

// }
// const cartSlice = createSlice({
//   name:'cart',
//   initialState,
//   reducers:{
//     addToCartList:(state,action)=>{
//       //console.log('products in cart',action.payload)
 
//       //if the product is already exists in the cart list then don't add it again block it
//        let existsItemIndex =state.productsInCart?.findIndex((item)=>item.id === action.payload?.id)
//        if(existsItemIndex>=0) {
//          alert('This movie already exists in your watchList')
//        }
//        else{
//          //add the movie to favorites list
//       let buildCartList ={...action.payload}
//       state.productsInCart?.push(buildCartList)
//       localStorage.setItem('productsInCart',JSON.stringify(state.productsInCart))
         
//        }
      
//      },
//        //clear all cart  List
//      clearAllCartList:(state,action)=>{
//       state.productsInCart=[];
//     },
//     //remove from cart list
//     removeFromCartList: (state, action) => {
//       let filteredProduct = state.productsInCart?.filter((item) => item?.id !== action.payload?.id);
//       //state.favoritesmovies?.splice(filteredMovies,1);
//       state.productsInCart = filteredProduct;
//       localStorage.setItem('productsInCart', JSON.stringify(state.productsInCart));
//     }

//   }

// })
// export const {addToCartList,removeFromCartList,clearAllCartList}=cartSlice.actions;
// export default cartSlice.reducer
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productsInCart: localStorage.getItem('productsInCart') ? JSON.parse(localStorage.getItem('productsInCart')) : [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCartList: (state, action) => {
      const existsItemIndex = state.productsInCart.findIndex((item) => item.id === action.payload.id);

      if (existsItemIndex >= 0) {
        // If the item already exists, increment the quantity
        state.productsInCart[existsItemIndex].quantity += 1;
      } else {
        // If the item doesn't exist, add it to the cart with quantity 1
        const newItem = { ...action.payload, quantity: 1 };
        state.productsInCart.push(newItem);
      }

      localStorage.setItem('productsInCart', JSON.stringify(state.productsInCart));
    },
    clearAllCartList: (state) => {
      state.productsInCart = [];
      localStorage.setItem('productsInCart', JSON.stringify(state.productsInCart));
    },
    removeFromCartList: (state, action) => {
      const existsItemIndex = state.productsInCart.findIndex((item) => item.id === action.payload.id);

      if (existsItemIndex >= 0) {
        // If the item exists, decrease the quantity
        state.productsInCart[existsItemIndex].quantity -= 1;

        // If the quantity becomes zero, remove the item from the cart
        if (state.productsInCart[existsItemIndex].quantity <= 0) {
          state.productsInCart.splice(existsItemIndex, 1);
        }
      }

      localStorage.setItem('productsInCart', JSON.stringify(state.productsInCart));
    },
  },
});

export const { addToCartList, removeFromCartList, clearAllCartList } = cartSlice.actions;
export default cartSlice.reducer;
