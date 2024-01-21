// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faStar } from '@fortawesome/free-solid-svg-icons';

// const ProductCard = ({ productItem }) => {
//   const posterUrl = productItem.thumbnail;

//   const cardStyle = {
//     width: '18rem',
//     height: '530px',
//     //border: 'none', // Remove border
//     boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add shadow
//   };

//   const starStyle = {
//     color: '#198754',
//     marginRight: '5px',
//   };

//   const stars = Array.from({ length: 5 }, (_, index) => (
//     <FontAwesomeIcon key={index} icon={faStar} style={starStyle} />
//   ));

//   return (
//     <div className="card" style={cardStyle}>
//       <Link to={`/product-details/${productItem.id}`}>
//         <img
//           src={posterUrl}
//           className="card-img-top"
//           alt={productItem.title}
//           style={{ height: '200px', objectFit: 'cover' }}
//         />
//       </Link>
//       <div className="card-body">
//         <h2 className="card-title">{productItem.title}</h2>
//         <p className="card-text">
//           <span style={{ maxHeight: '100px', overflow: 'hidden', display: 'block' }}>
//             {productItem.description}
//           </span>
//           <span style={{ display: 'block', marginBottom: '5px' }}>
//             {stars}
//           </span>
//         </p>
//         <button type="button" className="btn btn-outline-success rounded-pill">
//           Add To Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../slices/cartSlice';

const ProductCard = ({ productItem }) => {
  const dispatch = useDispatch();
  const [isClicked, setIsClicked] = useState(false);

  const posterUrl = productItem.thumbnail;

  const cardStyle = {
    width: '18rem',
    height: '530px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  const starStyle = {
    color: '#198754',
    marginRight: '5px',
  };

  const stars = Array.from({ length: 5 }, (_, index) => (
    <FontAwesomeIcon key={index} icon={faStar} style={starStyle} />
  ));

  // Add to Cart handler
  const addToCartHandler = () => {
    dispatch(addToCart(productItem));
    setIsClicked(true);
  };

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
        <h2 className="card-title">{productItem.title}</h2>
        <p className="card-text">
          <span style={{ maxHeight: '100px', overflow: 'hidden', display: 'block' }}>
            {productItem.description}
          </span>
          <span style={{ display: 'block', marginBottom: '5px' }}>{stars}</span>
        </p>
        <button
          type="button"
          className="btn btn-outline-success rounded-pill"
          onClick={addToCartHandler}
          disabled={isClicked}
        >
          {isClicked ? 'Added to Cart' : 'Add To Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
