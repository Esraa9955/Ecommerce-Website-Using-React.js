import ProductList from "./ProductList";
import { axiosInstance } from '../../apis/config';
import { useEffect, useState,  } from "react";
import { useParams } from "react-router-dom";

export default function Pagination(props) {
    
  const [products,setProduct]=useState([]);
  const [category, setCategory] = useState(0);
    
  useEffect(()=>{
    axiosInstance.get("/products").then((res)=>{console.log('The response recieved from the API was:',res.data);setProduct((res.data.products));})
    .catch((err) => console.log('Error',err));
  },[]);

  let myParams = useParams() 
  var currentItems = []

  console.log("Products are", products)

  console.log("params are:", myParams)

  for(var i = 0; i < products.length; i = i + 1) {
    if (myParams.category === products[i].category)
    currentItems.push(products[i])
  }

  console.log("The full list of data is:", products)

return (
    <>
        <ProductList products={currentItems} />
    </>
)
}