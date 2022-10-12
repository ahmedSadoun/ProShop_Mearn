import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FormConatiner from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { savePaymentMethod } from '../action/cartAction'

const PaymentScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart;
    const navigate = useNavigate();
    if (!shippingAddress) {
        navigate('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch()
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        navigate('/placeorder')
    }
    return (
        <FormConatiner>
            <CheckoutSteps step1 step2 step3 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check
                            type='radio'
                            label='PayPal or Credit Card'
                            id='PayPal'
                            name='paymentMethod'
                            value='PayPal'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}

                        ></Form.Check>
                        {/* in case of we need to add a new payment mehtod */}
                        {/* <Form.Check
                            type='radio'
                            label='Strip'
                            id='Strip'
                            name='paymentMethod'
                            value='Strip'
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}

                        ></Form.Check> */}
                    </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormConatiner>
    )
}
export default PaymentScreen;