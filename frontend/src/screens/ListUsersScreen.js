import React, { useEffect } from 'react'
import { Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { LinkContainer } from 'react-router-bootstrap'
import { listUsers, } from '../action/userAction'
import { useNavigate } from 'react-router-dom'
export default function ListUsersScreen() {
    const userLogIn = useSelector((state) => state.userLogIn);
    const { userInfo } = userLogIn;
    const navigate = useNavigate();
    if (!userInfo) {
        navigate('/')
    } else if (!userInfo.idAdmin) {
        navigate('/')
    }
    const userList = useSelector((state) => state.userList);
    const { loading, error, users } = userList;
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(listUsers())
    }, [dispatch])
    const deleteHandler = (id) => {
        console.log('deleted')
    }
    return <Row >
        <Col md={9}>
            <h2>Users</h2>
            {loading ? <Loader /> :
                error ? <Message variant='danger'>{error}</Message> :
                    (
                        <Table striped bordered hover responsive size="sm" className='table-sm'>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>EMAIL</th>
                                    <th>ADMIN</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(user => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>
                                            <a href={`mailto:${user.email}`}>{user.email}</a>
                                        </td>
                                        <td>
                                            {user.isAdmin ? (
                                                <i className='fas fa-check' style={{ color: 'green' }}></i>) :
                                                (<i className='fas fa-times' style={{ color: 'red' }}></i>
                                                )}
                                        </td>
                                        <td>
                                            <LinkContainer to={`/user/${user._id}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    <i className='fas fa-edit'></i>
                                                </Button>
                                            </LinkContainer>
                                            <Button variant='danger' className='btn-sm' style={{ marginLeft: '5px' }}
                                                onClick={() => deleteHandler(user._id)}
                                            >
                                                <i className='fas fa-trash'></i>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )
            }

        </Col>
    </Row >

}
