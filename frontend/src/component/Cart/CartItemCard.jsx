import React from 'react'
import { Link } from 'react-router-dom'
import './CartItemCard.css'

const CartItemCard = ({item,deleteCartItems}) => {
  return <>
 <div className="CartItemCard">
    <img src={item.image} alt="image not found" />
    <div>
        <Link to ={`/product/${item.prduct}`}>{item.name}</Link>
        <span>{`Price: $${item.price}`}</span>
        <p onClick={() => deleteCartItems(item.product)}>Remove</p>
    </div>
 </div>
  </>
}

export default CartItemCard