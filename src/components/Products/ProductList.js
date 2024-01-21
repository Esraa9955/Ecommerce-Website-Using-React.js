import React from 'react'
import ProductCard from './ProductCard';
import { Link } from "react-router-dom";

export default function ProductList(products){
  console.log("This is what products got:", products)

  if (products.products.length === 0)
    return (<div>Loading...</div>)
  else
  return (
    <>
      <div classname="container">
        <div className='row d-flex align-items-center border categoryRow'>
          <Link to="/category/smartphones" className='col-sm-2 categoryLink border'>Phones</Link>
          <br />
          <Link to="/category/home-decoration" className='col-sm-2 categoryLink border'>Home Deco</Link>
          <br />
          <Link to="/category/groceries" className='col-sm-2 categoryLink border'>Groceries</Link>
          <br />
          <Link to="/category/skincare" className='col-sm-2 categoryLink border'>Skincare</Link>
          <br />
          <Link to="/category/fragrances" className='col-sm-2 categoryLink border'>Perfume</Link>
          <br />
          <Link to="/category/laptops" className='col-sm-2 categoryLink border'>Laptops</Link>
          <br />
       </div>  
      </div>
      <div className="row row-cols-md-4">
        {products.products.map((product) => {
          return <div className="col" key={product.id}>
           <ProductCard productItem={product}/>
          </div>;
        })}
      </div>
    </>
  )
}
