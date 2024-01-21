import React from 'react'
import {Routes,Route} from 'react-router-dom'
import LayoutWithHeader from '../components/Layout/LayoutWithHeader'
import { Suspense } from "react";
import Products from '../pages/Products';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import NotFoundPage from '../pages/NotFoundPage';
import Pagination from '../components/Products/Pagination';
import Categorization from "../components/Products/Categorization"
const Router = () => {
  return (
   <>
   <Suspense fallback={<h5>Loading.........</h5>}>
  <Routes>
   
    <Route element={<LayoutWithHeader />} >
    <Route path='/' element={<Pagination />} />
    <Route path='/category/:category' element={<Categorization />} />
    <Route path='/product-details/:id' element={<ProductDetails />} />
    <Route path='/cart' element={<Cart />}/> 
   </Route>
   
   <Route path='*' element={<NotFoundPage/>}/>


  </Routes>
  </Suspense>
   
   </>
  )
}

export default Router
