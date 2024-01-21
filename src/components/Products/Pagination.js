import ProductList from "./ProductList";
import { axiosInstance } from '../../apis/config';
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';

export default function Pagination(props) {
    
  const [products,setProduct]=useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  var itemsPerPage = 4;
  
  console.log("The full list of data is:", products)

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);
  
  useEffect(()=>{
    axiosInstance.get("/products").then((res)=>{console.log('The response recieved from the API was:',res.data);setProduct((res.data.products));})
    .catch((err) => console.log('Error',err));
  },[itemOffset, itemsPerPage]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

return (
    <>
    <ProductList products={currentItems} />
    <ReactPaginate
        activeClassName={'item active '}
        breakClassName={'item break-me '}
        breakLabel={'...'}
        containerClassName={'pagination'}
        disabledClassName={'disabled-page'}
        marginPagesDisplayed={2}
        nextClassName={"item next "}
        nextLabel={<div style={{ fontSize: 18, width: 150 }}>Next</div>}
        onPageChange={handlePageClick}
        pageCount={pageCount}
        pageClassName={'item pagination-page '}
        pageRangeDisplayed={2}
        previousClassName={"item previous"}
        previousLabel={<div style={{ fontSize: 18, width: 150 }}>Previous</div>}
    />
  </>
)
}