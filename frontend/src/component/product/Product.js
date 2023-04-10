import React from 'react'
//import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import { Rating } from '@material-ui/lab'



const Product = ({product}) => {
  const options={
    readOnly: true,
    precision: 0.5,
    value:product.ratings,
   
}
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
        <img src={product.images[0].url} alt={product.name} />
        <p>{product.name}</p>
    <div>
        <Rating {...options} /> <span>({product.numOfReviews} Reviews)</span>
    </div>
    <span>{`$${product.price}`}</span>
    </Link>
  )
}

export default Product