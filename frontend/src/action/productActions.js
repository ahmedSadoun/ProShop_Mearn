import axios from 'axios'
import { PRODUCT_LIST_REQUIET,
     PRODUCT_LIST_SUCCESS, 
     PRODUCT_LIST_FAIL , 
    PRODUCT_DETAILS_REQUIET , 
    PRODUCT_DETAILS_SUCCESS , 
    PRODUCT_DETAILS_FAIL
    } from "../constants/productConstant.js"

export const listProducts = () => async (dispatch)=> {
    try{
        dispatch({
            type : PRODUCT_LIST_REQUIET
        }); 
        const {data} =await axios.get('/api/products')
            
        dispatch({
            type :PRODUCT_LIST_SUCCESS,
            payload:data
        })
    }catch (error){
        dispatch({
            type : PRODUCT_LIST_FAIL ,
            error : error.response && error.response.data.message ? 
            error.response.data.message : error.message ,  
        })
    }
}

export const listProductDetails = (id) => async (dispatch  )=> {
    try{
        dispatch({
            type : PRODUCT_DETAILS_REQUIET
        }); 
        const {data} = await axios.get(`/api/products/${id}`);
            console.log(data);
        dispatch({
            type :PRODUCT_DETAILS_SUCCESS,
            payload:data
        })
    }catch (error){
        dispatch({
            type : PRODUCT_DETAILS_FAIL ,
            error : error.response && error.response.data.message ? 
            error.response.data.message : error.message ,  
        })
    }
}