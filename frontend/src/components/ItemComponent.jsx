import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Container from 'react-bootstrap/esm/Container'
import Row from 'react-bootstrap/esm/Row'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import crutches_image from '../UI/img/crutches_image.jpg';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
const ItemComponent = () => {
    return (
        <Card>
            <Card.Header as="h5" className="text-md-left">~Item Name~</Card.Header>
            <Card.Body>
                <Row>
                    <Col className="col-8"> 
                        <Card.Title>Quantity: 5</Card.Title>
                        <Row>
                            <Col>
                                <Button variant="danger">Remove</Button>
                            </Col>
                            <Col>
                                <Button variant="warning">Edit</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col className="col-4"> 
                        <Image style={{ width: 100, height: 100 }} src={crutches_image} rounded={true}/>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    )
}

export default ItemComponent