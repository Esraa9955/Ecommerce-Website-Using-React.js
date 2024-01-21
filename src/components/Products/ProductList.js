import React from 'react'
import { useEffect, useState } from "react";
import { axiosInstance } from '../../apis/config';
import ProductCard from './ProductCard';
const ProductList = () => {
  const [products,setProduct]=useState([]);
  useEffect(()=>{
    axiosInstance.get("/products").then((res)=>{console.log('Response',res.data);
    setProduct((res.data.products))})
    .catch((err) => console.log('Error',err));
  },[]);
  return (
    <>
     <h1>categories</h1>
      <hr />
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {products.map((product) => {
          return <div className="col" key={product.id}>
           <ProductCard productItem={product}/>
          </div>;
        })}
      </div>
    </>
  )
}

export default ProductList
