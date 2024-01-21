import ProductList from "./ProductList";
import { axiosInstance } from '../../apis/config';
import { useEffect, useState } from "react";
import ReactPaginate from 'react-paginate';
// import "./Pagination.css"

export default function Pagination(props) {
  const [products, setProduct] = useState([]);
  const itemsPerPage = 4;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    axiosInstance.get("/products")
      .then((res) => {
        console.log('Response', res.data);
        setProduct(res.data.products);
      })
      .catch((err) => console.log('Error', err));
  }, [itemOffset, itemsPerPage]);

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
        activeClassName='active'
        // breakClassName='pagination-break-me'
        breakLabel='...'
        containerClassName='pagination justify-content-center'
        // disabledClassName='pagination-disabled-page'
        marginPagesDisplayed={2}
        // nextClassName='pagination-next'
        nextLabel={"Next"}
        onPageChange={handlePageClick}
        pageCount={pageCount}
        pageClassName={"page-item"}
        pageRangeDisplayed={2}
        // previousClassName='pagination-previous'
        previousLabel={"Previous"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
      />
    </>
  );
}
