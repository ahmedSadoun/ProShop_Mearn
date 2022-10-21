import { Button, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const ProfileScreen = () => {
    return <Row>
        <Col md={3}>
            <Row>
                <LinkContainer to={`/updateuserprofile`}>
                    <Button variant='primary'>
                        Update Profile
                    </Button>
                </LinkContainer>
            </Row>
            <Row style={{ marginTop: '10px ' }}>
                <LinkContainer to={`/myorderlist`}>
                    <Button variant='primary'>
                        My Orders
                    </Button>
                </LinkContainer>
            </Row>
        </Col>
    </Row>

}
export default ProfileScreen;