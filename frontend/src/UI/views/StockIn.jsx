import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ItemList from '../../components/ItemList';
import { useState } from 'react';
import AddItem from '../../components/AddItem';


const StockIn = () => {
  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [compactor, setCompactor] = useState(1)
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
      itemQuantity: 4
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
  
  const onSubmit = (e) => {
    e.preventDefault()
    // check for name, email, compactor number and items to be added
    try {
      if(userName.length === 0){
        throw new Error("username is empty");
      }
      else if(email.length === 0){
        throw new Error("email is empty");
      }
      else if(items.length === 0){
        throw new Error("No Items to add");
      }
      else if(compactor > 2 || compactor < 1){
        throw new Error("Compactor does not exist");
      }
      else{
        alert("ok")
        let toSubmit = {
          "userName": userName,
          "email": email,
          "compactor": compactor,
          "items": items
        }
        console.log(toSubmit)
      }
    }
    catch(error){
      alert(error);
    }
    
  }
  return (
    <Row>
      <Col></Col>
      <Col>
        <Form onSubmit={onSubmit}>
          {/* Email */}
          <Form.Group className="mb-3 mx-auto" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
            type="email" 
            placeholder="Enter email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)
            }/>
          </Form.Group>

          {/* Name */}
          <Form.Group className="mb-3" controlId="forName">
            <Form.Label>Name</Form.Label>
            <Form.Control 
            type="text" 
            placeholder="Enter name" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>

          {/* Compactor Number */}
          {/* TBC - Need to add limit to the number 1-2  */}
          <Form.Group className="mb-3" controlId="forCompactor">
            <Form.Label>Compactor Number</Form.Label>
            <Form.Control 
            type="number" 
            placeholder="Enter Compactor Number" 
            value={compactor}
            onChange={(e) => setCompactor(e.target.value)}
          />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>

          <hr />
          {/* Add New Item  */}
          <AddItem onAddItem={addItem}/>
          <hr/>
          {/* Item List */}
          <ItemList items={items} onRemoveItem={removeItem} />
          <br />
      </Col>
      <Col></Col>
    </Row>
  )
}

export default StockIn