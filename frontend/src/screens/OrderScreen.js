import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PayPalButton } from 'react-paypal-button-v2'
import { getOrderDetails, payOrder } from '../action/orderActions'
import './placeOrder.css'
import { ORDER_PAY_RESET } from '../constants/orderConstants'
const OrderScreen = () => {
    const { id: orderId } = useParams();
    const [sdkReady, setSdkReady] = useState(false);
    const dispatch = useDispatch();
    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails;
    const orderPay = useSelector(state => state.orderPay)
    const { success: successPay, loading: loadingPay } = orderPay;
    if (!loading) {
        // Calculate prices
        const addDecimals = (num) => {
            //to get two digits after the decimal sign
            return (Math.round(num * 100 / 100).toFixed(2))
        }
        order.orderPrice = addDecimals(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    }
    useEffect(() => {
        const addPayPalScript = async () => {
            //in order to get the sdk ready 
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true;
            //on this element is being loaded then update the state of the sdk
            script.onload = () => {
                setSdkReady(true);
            }
            document.head.appendChild(script);
        }
        /* we need to see the order if the payment is successful or not 
        so get the product if there is no order or the successpay is true 
        */
        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) { // if the order is not paid then give the ability to pay 
            if (!window.paypal) {//if the window dosn't have the paypal script then add it 
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [dispatch, orderId, successPay, order])

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(orderId, paymentResult))
        window.location.reload();
    }
    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
        <>
            <h1>Order {order._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p> <strong>Name: </strong>{order.user.name}</p>
                            <p><a href={`mailto:${order.user.email}`}> {order.user.email}</a></p>
                            <p>
                                <strong>Address:</strong>
                                {order.shippingAddress.address},{order.shippingAddress.city}{' '}
                                {order.shippingAddress.postalCode},{' '}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <Message variant='success'>Deliverd on {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='danger'>Not Deliverd</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>

                            <p><strong>Method: </strong>
                                {order.paymentMethod}</p>
                            {order.isPaid ? (
                                <Message variant='success'>Paid on {order.paidAt}</Message>
                            ) : (
                                <Message variant='danger'>Not paid</Message>

                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 ? <Message>Order is empty
                            </Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name}
                                                        fluid rounded />
                                                </Col>
                                                <Col>
                                                    {/* item.product is the item id  */}
                                                    <Link to={`/ product / ${item.product} `}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4} >
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.orderPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.texPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton amount={order.totalPrice}
                                            onSuccess={successPaymentHandler} />
                                    )}
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
}

export default OrderScreen