import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL
} from '../constants/orderConstants'
import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })
        //destructure the userLogin from the getState then destructure the userInfo from the userLogin
        const { userLogIn: { userInfo }, } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        // when the request is a post one , then we have to pass the payload as an object parameter .
        const { data } = await axios.post(`/api/orders`, order, config)
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })

    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })
        //destructure the userLogin from the getState then destructure the userInfo from the userLogin
        const { userLogIn: { userInfo }, } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        // when the request is a post one , then we have to pass the payload as an object parameter .
        const { data } = await axios.get(`/api/orders/${id}`, config)
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })

    }
}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })
        //destructure the userLogin from the getState then destructure the userInfo from the userLogin
        const { userLogIn: { userInfo }, } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        // when the request is a post one , then we have to pass the payload as an object parameter .
        const { data } = await axios.put(`/api/orders/${orderId}/pay`, paymentResult, config)
        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })

    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })
        //destructure the userLogin from the getState then destructure the userInfo from the userLogin
        const { userLogIn: { userInfo }, } = getState();
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }
        // when the request is a post one , then we have to pass the payload as an object parameter .

        const { data } = await axios.get(`/api/orders/myorders`, config)
        dispatch({
            type: ORDER_LIST_MY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message,
        })

    }
}