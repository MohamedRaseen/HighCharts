import { createSlice } from "@reduxjs/toolkit";

const appData = createSlice({
    name: 'appData',
    initialState: {
        allProducts: [],
        allCatgories:[],
        productsOnCategory:[],
        isLoading: false
    },
    reducers: {
        updateAllProducts(state ={},action) {
            let products = action?.payload?.products;
            if(Array.isArray(products) && products.length > 0) {
                return {...state, allProducts : [...products], isLoading: false};
            }
            else{
                return {...state, isLoading: false}
            }
        },
        updateAllCategories(state={}, action){
            let categories = action.payload;
            if(Array.isArray(categories) && categories.length > 0){
                return {...state, allCatgories: [...categories], isLoading: false}
            }
            else {
                return {...state, isLoading: false}
            }
            
        },
        updateLoading(state={}, action){
            return {...state, isLoading: action.payload}
        },
        updateProductsOnCategory(state={}, action) {
            let products = action?.payload?.products;

            if(Array.isArray(products) && products.length > 0) {
                return {...state, productsOnCategory: [...products], isLoading: false}
            }
            else {
                return {...state, isLoading: false}
            }
        }
    }
})

export const { updateAllProducts, updateAllCategories, updateLoading, updateProductsOnCategory} = appData.actions;
export default appData.reducer;