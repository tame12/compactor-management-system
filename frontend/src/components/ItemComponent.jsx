import React from 'react'
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Image from 'react-bootstrap/Image'
import crutches_image from '../UI/img/crutches_image.jpg';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
const ItemComponent = ({ item, onRemoveItem }) => {
    return (
        <Card>
            <Card.Header as="h5" className="text-md-left">{item.itemName}</Card.Header>
            <Card.Body>
                <Row>
                    <Col className="col-8"> 
                        <Card.Title>Quantity: {item.itemQuantity}</Card.Title>
                        <Row>
                            <Col>
                                <Button variant="danger" onClick={() => onRemoveItem(item.itemName)}>Remove</Button>
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