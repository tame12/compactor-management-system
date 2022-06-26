import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ItemComponent from '../../components/ItemComponent';

const StockIn = () => {
  return (
    <Row>
      <Col></Col>
      <Col>
        <Form>
          {/* Email */}
          <Form.Group className="mb-3 mx-auto" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          {/* Name */}
          <Form.Group className="mb-3" controlId="forName">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" />
          </Form.Group>

          {/* Compactor Number */}
          {/* TBC - Need to add limit to the number 1-2  */}
          <Form.Group className="mb-3" controlId="forCompactor">
            <Form.Label>Compactor Number</Form.Label>
            <Form.Control type="number" placeholder="Enter Compactor Number" />
          </Form.Group>

          {/* Input item name and quantity */}
          <Form.Group className="mb-3" controlId="forItemInput">
            <Form.Label>Item Name</Form.Label>
            <Form.Control type="text" placeholder="Enter Item Name" />
            <Form.Label>Item Quantity</Form.Label>
            <Form.Control type="number" placeholder="Enter Quantity" />
          </Form.Group>
          
          <h3>List of items</h3>
          {/* to be rendered from state  */}
          
          {/* props for each item:
            name
            image source
            quantity
          */}
          <ItemComponent/>
          <ItemComponent/>
          
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Col>
      <Col></Col>
    </Row>
  )
}

export default StockIn