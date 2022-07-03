import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ItemList from '../../components/ItemList';
import { useState } from 'react';
import AddItem from '../../components/AddItem';


const StockIn = () => {
  const [items, setItems] = useState([
    { 
      id: 1,
      itemName: "crutches",
      itemQuantity: 5
    },
    {
      id: 2,
      itemName: "walking frame",
      itemQuantity: 3
    },
    {
      id: 3,
      itemName: "walking stick",
      itemQuantity: 3
    }
  ])

  const addItem = (item) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newItem = {id, ...item}

    setItems([...items, newItem])
  }

  const removeItem = (itemName) => {
    setItems(items.filter((item) => item.itemName !== itemName))
  } 

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
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

          <hr />

          <AddItem onAddItem={addItem}/>

          <hr/>

          {/* to be rendered from state  */}
          
          {/* props for each item:
            name
            image source
            quantity
          */}
          
          
          <ItemList items={items} onRemoveItem={removeItem} />
          
          
          <br />
      </Col>
      <Col></Col>
    </Row>
  )
}

export default StockIn