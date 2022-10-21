import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom' //this is the import in the head of the file
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUser } from '../action/userAction'
import FormConatiner from '../components/FormContainer'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import checkIfAdmin from '../checkIfAdmin'
const UserEditScreen = ({ }) => {
    // checkIfAdmin();
    const { id: userId } = useParams()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const navigate = useNavigate();
    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user } = userDetails;
    const [isAdmin, setIsAdmin] = useState(user.isAdmin)

    const userUpdate = useSelector((state) => state.userUpdate);
    const { loading: updateLoading, error: updateError, success: updateSuccess } = userUpdate;

    useEffect(() => {
        if (updateSuccess) {
            dispatch({ type: USER_UPDATE_RESET })
            navigate('/admin/userlist')
        } else {
            if (!user || !user.name || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }

    }, [dispatch, userId, user, updateSuccess])
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(isAdmin)
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
            <FormConatiner>
                {updateLoading && <Loader />}
                {updateError && <Message variant='danger'>{updateError}</Message>}
                {/* {updateSuccess && <Message variant='success'>{'Updated Successfully'}</Message>} */}
                {loading ? <Loader /> :
                    error ? <Message variant='danger' >{error}</Message> : (
                        <><h1>Edit User</h1><Form onSubmit={submitHandler}>
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
                            <Form.Group controlId='isadmin'>
                                <Form.Check
                                    type='checkbox'
                                    label='Is  Admin'
                                    checked={isAdmin}
                                    onChange={(e) => { setIsAdmin(e.target.checked) }}>

                                </Form.Check>
                            </Form.Group>
                            <Button type='submit' variant='primary'>
                                Update
                            </Button>
                        </Form>
                        </>
                    )
                }
            </FormConatiner>
        </>
    )
}
export default UserEditScreen;