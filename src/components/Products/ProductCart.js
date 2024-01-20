import React, { useState,useEffect } from 'react'
import {axiosInstance} from '../../apis/config'
import { useDispatch } from 'react-redux';
import {removeFromCartList} from '../../slices/cartSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const ProductCart = ({cartItem}) => {
const [productDetails,setProductDetails]=useState({})
useEffect(() => {
  axiosInstance
    .get(`/products/${cartItem.id}`)
    .then((res) => {
      console.log("Response", res.data);
      setProductDetails((res.data))})
    .catch((err) => console.log('Error',err));
}, []);
const dispatch=useDispatch();
  const removeFromCartHandler=(productDetails)=>{
    console.log('Removing from favorites:', cartItem);

    
      dispatch(removeFromCartList(productDetails));
   
  }
  const posterUrl = cartItem?.thumbnail || '';
  const cardStyle = {
    width: '18rem',
    height: '400px',
    //border: 'none', // Remove border
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add shadow
  };

  const starStyle = {
    color: '#198754',
    marginRight: '5px',
  };

  const formattedPrice = Number(productDetails.price).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
   
  });
  const stars = Array.from({ length: 5 }, (_, index) => (
    <FontAwesomeIcon key={index} icon={faStar} style={starStyle} />
  ));


  return (
    <>
    <div className="card" style={cardStyle}>
      <Link to={`/product-details/${productDetails.id}`}>
        <img
          src={posterUrl}
          className="card-img-top"
          alt={productDetails.title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      </Link>
      <div className="card-body">
        
      <div className="d-flex justify-content-between">
          <h5 className="card-title">{productDetails.title}</h5>
          <h6>{formattedPrice}</h6>
        </div>
        <p className="card-text">
          <span style={{ maxHeight: '100px', overflow: 'hidden', display: 'block' }}>
            {productDetails.brand}
          </span>
          <span style={{ display: 'block', marginBottom: '5px' }}>
            {stars}
          </span>
        </p>
        
  <button type="button" className="btn btn-outline-success rounded-pill ">
    Add To Cart
  </button>
  {productDetails.stock?<span className="badge  mx-4 px-3  rounded-5" style={{ 
    background: 'green' }}>On stock</span>:<span className="badge  mx-4 px-3  rounded-5"style={{ 
      background: 'red' }}>out stock </span>}

      </div>
    </div>
    
    </>
  )
}

export default ProductCart
