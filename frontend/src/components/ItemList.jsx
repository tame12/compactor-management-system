import React from 'react'
import ItemComponent from './ItemComponent'
const ItemList = ({ items, onRemoveItem }) => {
    return (
        <div>
            <h3>List of Items for Stocking</h3>
            {items.map((item, index) => 
                <ItemComponent key={index} item={item} onRemoveItem={onRemoveItem}/>
            )}
        </div>
    )
}

export default ItemList