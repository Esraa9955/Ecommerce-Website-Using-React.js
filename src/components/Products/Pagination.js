import ProductList from "./ProductList";
import { axiosInstance } from '../../apis/config';
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';

export default function Pagination(props) {
    
  const [products,setProduct]=useState([]);
  var itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);
  
  
  useEffect(()=>{
    axiosInstance.get("/products").then((res)=>{console.log('Response',res.data);setProduct((res.data.products));})
    .catch((err) => console.log('Error',err));
  },[itemOffset, itemsPerPage]);

  console.log("This should be data", products)

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  console.log("More data:", products)

return (
    <>
    <ProductList products={currentItems} />
    <ReactPaginate
    breakLabel="..."
    nextLabel="next >"
    onPageChange={handlePageClick}
    pageRangeDisplayed={5}
    pageCount={pageCount}
    previousLabel="< previous"
    renderOnZeroPageCount={null}
    />
  </>
)
}