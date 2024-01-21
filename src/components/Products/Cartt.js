import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../apis/config';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../../slices/cartSlice';
import { addToCart } from '../../slices/cartSlice';
import LanguageContext from '../../context/language';

const Cartt = ({ product }) => {
  const [productDetails, setProductDetails] = useState({});
  const { language } = useContext(LanguageContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Replace the API endpoint with the correct one for your product details
        const response = await axiosInstance.get(`/product/${product.id}`, {
          params: {
            api_key: 'Your Api Key', // Replace with your API key
            language: language,
          },
        });
        setProductDetails(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    fetchProductDetails();
  }, [product.id, language]);

  const removeFromFavoritesHandler = () => {
    console.log('Removing from favorites:', product);
    dispatch(removeFromCart(productDetails));
  };

  const addToCartHandler = () => {
    console.log('Adding to cart:', product);
    dispatch(addToCart(productDetails));
  };

  const imageUrl = `https://example.com/${productDetails.imagePath}`; // Replace with your actual image path

  return (
    <div className="card flex items-center bg-white rounded-lg shadow-md md:flex-row md:max-w-xl dark:bg-gray-900 m-2 pt-2">
      <Link to={`/product-details/${productDetails.id}`} className="text-black hover:text-blue-500">
        <div className="image-container">
          <img src={imageUrl} className="img-fluid rounded" alt={productDetails.name} />
        </div>
      </Link>

      <div className="card-body ml-4">
        <h2 className="text-lg font-semibold">{productDetails.name}</h2>
        {/* Adjust the display based on your product details */}
        <p className="text-sm text-gray-600">
          <strong>Price:</strong> ${productDetails.price}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Quantity:</strong> {product.quantity} {/* Display the quantity here */}
        </p>

        <div className='button'>
          <button onClick={addToCartHandler} className='add-to-cart'> + </button>
          <span></span>
          <button onClick={removeFromFavoritesHandler} className='remove-fromcart'> - </button>
        </div>
      </div>
    </div>
  );
};

export default Cartt;
