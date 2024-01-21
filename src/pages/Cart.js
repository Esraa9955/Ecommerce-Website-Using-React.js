import React from 'react'
import { useSelector } from 'react-redux';
import Cartt from '../components/Products/Cartt';
const Cart = () => {
  const { productsInCart } = useSelector((state) => state?.cart);
  return (
    <div>
     <div className='continer'>
     <h1 className='text-4xl text-center py-5 dark:bg-gray-800 dark:text-gray-200'>Cart List</h1>
      <div className="row row-cols-1 row-cols-md-5 g-4">
        {productsInCart?.map((product) => {
          return <Cartt key={product?.id} cartItem={product} />;
        })}
      </div>
     </div>
    </div>
  )
}

export default Cart