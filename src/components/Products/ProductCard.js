import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCartList } from '../../slices/cartSlice';
const ProductCard = ({ productItem }) => {
  const posterUrl = productItem.thumbnail;

  const dispatch =useDispatch();
  const [isClicked, setIsClicked] = useState(false);
  // add to favorites movies
  const addToCartHandler=(productItem)=>{
    dispatch(addToCartList(productItem))
    setIsClicked(true);

  }
  

  const cardStyle = {
    width: '18rem',
    height: '500px',
    //border: 'none', // Remove border
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add shadow
  };

  const starStyle = {
    color: '#198754',
    marginRight: '5px',
  };

  const formattedPrice = Number(productItem.price).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
   
  });
  const stars = Array.from({ length: 5 }, (_, index) => (
    <FontAwesomeIcon key={index} icon={faStar} style={starStyle} />
  ));

  return (
    <div className="card" style={cardStyle}>
      <Link to={`/product-details/${productItem.id}`}>
        <img
          src={posterUrl}
          className="card-img-top"
          alt={productItem.title}
          style={{ height: '200px', objectFit: 'cover' }}
        />
      </Link>
      <div className="card-body">
        
      <div className="d-flex justify-content-between">
          <h5 className="card-title">{productItem.title}</h5>
          <h6>{formattedPrice}</h6>
        </div>
        <p className="card-text">
          <span style={{ maxHeight: '100px', overflow: 'hidden', display: 'block' }}>
            {productItem.brand}
          </span>
          <span style={{ display: 'block', marginBottom: '5px' }}>
            {stars}
          </span>
        </p>
        
  <button type="button" className="product-add-button " onClick={()=> addToCartHandler(productItem)}>
    Add To Cart
  </button>
      {productItem.stock?<span className="badge  mx-4 px-3  rounded-5" style={{ 
      background: 'green' }}>On stock</span>:<span className="badge  mx-4 px-3  rounded-5"style={{ 
      background: 'red' }}>out stock </span>}


      </div>

    </div>
  );
};

export default ProductCard;