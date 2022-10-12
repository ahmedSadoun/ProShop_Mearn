import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../action/productActions'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'

const HomeScreen = () => {
    // const [products,setProducts]=useState([]);
    const dispatch = useDispatch()
    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList
    console.log(products);
    useEffect(() => {
        dispatch(listProducts())
        // const fetchProducts=async()=>{
        //     const {data} = await axios.get('/api/products');
        //     setProducts(data)
        // }
        // fetchProducts();
    }, [dispatch])
    //const products=[]
    //we could pass alist of variables as a second args to the useEffect , to get the useEFFect function fired off if the varible value changed

    return (
        <>
            <h1>Latest products </h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>
                {error}
            </Message> :
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3} >
                            <Product product={product} />
                        </Col>
                    )
                    )}
                </Row>
            }
        </>
    )
}


export default HomeScreen;