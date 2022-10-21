import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' //this is the import in the head of the file
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { login } from '../action/userAction'
import FormConatiner from '../components/FormContainer'

const LoginScreen = ({ }) => {

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    let redirect = location.search ? '/' + location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogIn);

    const { loading, error, userInfo } = userLogin;
    useEffect(() => {
        //we want to check if the user is existed or not .
        //if the user is existed then redirect .
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo])
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <FormConatiner>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>"Invalid email or passwrod"</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}>

                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register

                    </Link>
                </Col>
            </Row>
        </FormConatiner>
    )
}
export default LoginScreen;