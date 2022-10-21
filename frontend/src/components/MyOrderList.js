import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom' //this is the import in the head of the file
import { Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listMyOrders } from '../action/orderActions'
import { LinkContainer } from 'react-router-bootstrap'

const MyOrderList = ({ }) => {
    const navigate = useNavigate();

    const orderListMy = useSelector((state) => state.orderListMy);
    const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

    const userLogin = useSelector((state) => state.userLogIn);
    const { userInfo } = userLogin;
    const dispatch = useDispatch()
    useEffect(() => {
        //we want to check if the user is existed or not .
        //if the user is existed then redirect .
        if (!userInfo) {
            navigate('/login')
        } else {
            dispatch(listMyOrders())
        }
    }, [dispatch, navigate, userInfo])

    return <Row >
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>
                {errorOrders}
            </Message> : (

                <Table striped bordered hover responsive className='table-sm' >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Date</th>
                            <th>TOTAl</th>
                            <th>PAID</th>
                            <th>DELIVERD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.createdAt && order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice} $</td>
                                <td>{order.isPaid ? (
                                    order.paidAt.substring(0, 10)
                                ) : (
                                    (<i className='fas fa-times' style={{ color: 'red' }}></i>)
                                )}</td>
                                <td>{order.isDeliverd ? (
                                    order.deliverdAt.substring(0, 10)
                                ) : (
                                    (<i className='fas fa-times' style={{ color: 'red' }}></i>)
                                )}</td>
                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button className='btn-sm' variant='light'>Details</Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )
            }

        </Col>
    </Row>

}
export default MyOrderList;