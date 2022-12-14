//this will automaticaly handle the exception when i try to retreive data from database 
import AsyncHandler from 'express-async-handler'
import Order from '../models/orderModel.js'

//@desc Create new order 
//@route POST /api/orders
//@access Private
const addOrderItems = AsyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body
    if (orderItems && orderItems.length === 0) {
        //bad request
        res.status(400)
        throw new Error('No order items')
        return
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })
        const createOrder = await order.save();
        // record created 
        res.status(201).json(createOrder)
    }


})

//@desc get order by id 
//@route get /api/orders/:id
//@access Private
const getOrderByID = AsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
        res.send(order);
    } else {
        res.status(404);
        throw new Error('Order not found')
    }
})


//@desc Update order to paid  
//@route GET /api/orders/:id/pay
//@access Private
const updateOrderToPaid = AsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address
        }
        const updatedOrder = await order.save();
        res.json(updatedOrder)
    } else {
        res.status(404);
        throw new Error('Order not found')
    }
})

//@desc Get logged in user orders 
//@route GET /api/orders/myorders
//@access Private
const getMyorders = AsyncHandler(async (req, res) => {
    //in order to retreive a list of a user orders
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
})

export { addOrderItems, getOrderByID, updateOrderToPaid, getMyorders }