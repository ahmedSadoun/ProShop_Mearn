import React, { useState, useEffect } from 'react'

import { Container, Row, Col, Form } from 'react-bootstrap'

const FormConatiner = ({ children }) => {

    return (
        <Container>
            <Row className='justify-content-md-center'>
                <Col xs={12} md={6}>
                    {children}
                </Col>
            </Row>
        </Container>
    )
}

export default FormConatiner;