import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom' //this is the import in the head of the file
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../action/userAction'
import FormConatiner from '../components/FormContainer'

const RegisterScreen = ({ }) => {

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [consfirmPassword, setConsfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const navigate = useNavigate();
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    let redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    console.log(error)
    useEffect(() => {
        //we want to check if the user is existed or not .
        //if the user is existed then redirect .
        if (userInfo) {
            navigate(redirect)
        }
    }, [history, userInfo, redirect])
    const submitHandler = (e) => {
        e.preventDefault();
        //DISPATCH REGISTER 
        if (password !== consfirmPassword) {
            setMessage('Password do not match')
        } else {

            dispatch(register(name, email, password))
        }
    }

    return (
        <FormConatiner>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>"Invalid email or passwrod"</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}>

                    </Form.Control>
                </Form.Group>
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
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confrim Password </Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        //value={password}
                        onChange={(e) => { setConsfirmPassword(e.target.value) }}>
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary'>
                    Register
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an Account? <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login

                    </Link>
                </Col>
            </Row>
        </FormConatiner>
    )
}
export default RegisterScreen;