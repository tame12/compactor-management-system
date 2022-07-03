import React from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';



const AddItem = ({ onAddItem }) => {
    const [itemName, setItemName] = useState('')
    const [itemQuantity, setItemQuantity] = useState('')
    
    // onSubmit functions
    const onSubmit = (e) => {
        e.preventDefault()
    
        if (!itemName) {
            alert("No Item Added!")
            return
        }
    
        // trigger onAddItem event from parent component (stockIn)
        onAddItem({ itemName, itemQuantity })
    
        // reset input fields to blank
        setItemName('')
        setItemQuantity('')
    }


    return (
        <Form onSubmit={onSubmit}>
            {/* Input item name and quantity */}
            <Form.Group className="mb-3" controlId="forItemInput">
            
                <Form.Label>Item Name</Form.Label>
                <Form.Control 
                type="text" 
                placeholder="Enter Item Name" 
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}/>
                
                <Form.Label>Item Quantity</Form.Label>
                <Form.Control 
                type="number" 
                placeholder="Enter Quantity" 
                value={itemQuantity}
                onChange={(e) => setItemQuantity(e.target.value)}/>
            
            </Form.Group>

            <Button variant="primary" value="Add Item" type="submit">
                Add Item +
            </Button>
        </Form>
    )
}

export default AddItem