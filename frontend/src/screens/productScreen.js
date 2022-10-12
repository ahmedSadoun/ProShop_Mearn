import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import { useDispatch, useSelector } from 'react-redux'
import { useParams , useNavigate } from 'react-router-dom';
import { listProductDetails } from '../action/productActions'
const ProductScreen = () => {
    const { id } = useParams();
    let navigate = useNavigate()
    const [qty, setQty] = useState(1);
    const dispatch = useDispatch();

    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails
    useEffect(() => {
        console.log("the id is : " + id)
        dispatch(listProductDetails(id))
        // const fetchProductById=async()=>{

        //     const {data} = await axios.get(`/api/products/${id}`);
        //     setProduct(data)
        // }
        // fetchProductById();
    }, [dispatch, id])
    const addToCartHandler = ()=>{
        navigate(`/cart/${id}?qty=${qty}`)
    }
    return (
        <div>
            <Link className='btn btn-light my-3' to='/'> Go Back</Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                (

                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.alt} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name} </h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Price : ${product.price}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description : {product.description}
                                </ListGroup.Item>
                            </ListGroup>

                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                price:
                                            </Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                                Staus:
                                            </Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    {/* && means Then  */}
                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>

                                                        {[...Array(product.countInStock).keys()].map(x => (
                                                            <option key={x + 1} value={x + 1}>
                                                                {x + 1}
                                                            </option>
                                                        ))}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}
                                    <ListGroup.Item>
                                        <div className="d-grid gap-2">

                                            <Button className='btn-block' onClick={addToCartHandler} type='button' disabled={product.countInStock === 0}>
                                                Add To Cart
                                            </Button>
                                        </div>

                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                )
            }
            {product.name}
        </div>
    )
}

export default ProductScreen;
