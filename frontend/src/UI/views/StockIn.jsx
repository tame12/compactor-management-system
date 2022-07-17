import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ItemList from '../../components/ItemList';
import { useState } from 'react';
import AddItem from '../../components/AddItem';


const StockIn = () => {
  const [userName, setUserName] = useState("mock-username")
  const [email, setEmail] = useState("mock@email")
  const [compactor, setCompactor] = useState(1)
  const [items, setItems] = useState([
    { 
      itemName: "crutches",
      itemQuantity: 5
    },
    {
      itemName: "walking frame",
      itemQuantity: 3
    },
    {
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

  const sendToLogs = async (payload) => {
    const url = "http://localhost:8082/api/logging"
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      alert(response.status)
      return response.json();
    }
    catch(err) {
      console.log("FE " + err)
    }
  }

  const sendToCompactor = async (payload, compactorNumber) => {
    // extract items and which compactor they are being stocked in for
    // assume that new items could have been added
    // await API call 
    // var compactorNumber = 1 // hardcoded for testing. but works now
    const url = "http://localhost:8082/api/compactor/" + String(compactorNumber)
    // console.log(url)
    // console.log(JSON.stringify(payload))
    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
        //perhaps i can replace payload with the actual correct data? but if i do that i'll have to do the logic here which seems difficult
      })
      alert(response.status)
      return response.json();
    }
    catch(err) {
      console.log("FE " + err)
    }
    return 'successfully sent to compactor';
  }

  const onSubmit = (e) => {
    alert("sent!")
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
        // call sendToCompactor
        // call sendToLogs
        // once both operations are successful, can redirect to confirmation page,.

        const logsPayload = {
          "username": userName,
          "email": email,
          "compactorID": compactor,
          "changedItems": items
        }
        const logStatus = sendToLogs(logsPayload)

        const compactorPayload = {
          "inOrOut": "in",
          "compactorID": compactor,
          "changedItems": items, // keep in mind that the items that are changed here will be directly sent to the payload
          "items": items // has to be named "items"
        }
        // const compactorStatus = sendToCompactor(compactorPayload)
        const compactorStatus = sendToCompactor(compactorPayload, compactor)
      }
    }
    catch(error){
      alert(error);
    }
    
  }
  return (
    <Row>
      <Col style={{marginLeft: 30}}>
        <h1>Stock-In Page</h1>
      </Col>
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