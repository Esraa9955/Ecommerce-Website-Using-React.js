import React from 'react'
import ProductCard from './ProductCard';
import { useEffect, useState } from "react";

export default function ProductList(products){
  console.log("This is what products got:", products)

  if (products.products.length ==0)
    return (<div>Loading</div>)
  else
  return (
    <>
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {products.products.map((product) => {
          return <div className="col" key={product.id}>
           <ProductCard productItem={product}/>
          </div>;
        })}
      </div>
    </>
  )
}
