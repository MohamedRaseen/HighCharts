import { GET_ALL_CATEGORIES, GET_ALL_PRODUCT_DATA, GET_PRODUCTS_ON_CATEGORY } from "../constants"

export const getAllProducts = () => {
    return {
        type: GET_ALL_PRODUCT_DATA
    }
}

export const getAllCategories = () => {
    return {
        type: GET_ALL_CATEGORIES
    }
}

export const fetchProductsOnCategory = (payload) => {
    return {
        type: GET_PRODUCTS_ON_CATEGORY,
        payload
    }
}