import { SERVICE_CALLS, GET_ALL_PRODUCT_DATA, GET_ALL_CATEGORIES, GET_PRODUCTS_ON_CATEGORY } from "../constants";
import { takeLatest, put } from 'redux-saga/effects'
import { callApi } from "../serviceCall";
import { updateAllProducts, updateLoading, updateAllCategories, updateProductsOnCategory } from "../features/appReducer";
import { IProduct, type ICategory } from "../interfaces/appInterfaces";
import { SagaIterator } from "redux-saga";

function* fetchAllProducts() {
    try {
        yield put(updateLoading(true));
        let allProducts: IProduct[]= yield callApi(SERVICE_CALLS.allProducts, 'GET');
        yield put(updateAllProducts(allProducts));
    }
    catch(e: any) {
        console.log(e?.message);
        yield put(updateAllProducts([]));
    }
} 

function* fetchAllCategories() {
    try {
        yield put(updateLoading(true));
        const allCategories: ICategory[] = yield callApi(SERVICE_CALLS.allCategories, 'GET');
        yield put(updateAllCategories(allCategories));
    } catch (error: any) {
        console.log(error?.message);
        yield put(updateAllProducts([]));
    }
}

function* fetchProductOnCategory(param) {
    try {
        yield put(updateLoading(true));
        let allProducts: IProduct[]= yield callApi(param.payload, 'GET');
        yield put(updateProductsOnCategory(allProducts));
    }
    catch(err: any) {
        console.log(err?.message);
        yield put(updateProductsOnCategory([]));
    }
}

export default function* rootSaga(): SagaIterator {
    yield takeLatest(GET_ALL_PRODUCT_DATA, fetchAllProducts)
    yield takeLatest(GET_ALL_CATEGORIES, fetchAllCategories)
    yield takeLatest(GET_PRODUCTS_ON_CATEGORY, fetchProductOnCategory)
}