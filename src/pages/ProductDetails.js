import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../apis/config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const params = useParams();

  useEffect(() => {
    axiosInstance
      .get(`/products/${params.id}`)
      .then((res) => {
        console.log("Response", res.data);
        setProductDetails(res.data);
        // Set the first image as the initially selected image
        setSelectedImage(res.data.images[0]);
      })
      .catch((err) => console.log("Error", err));
  }, [params.id]);

  const starStyle = {
    color: "#198754",
    marginRight: "5px",
  };

  const formattedPrice = Number(productDetails.price).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  const stars = Array.from({ length: 5 }, (_, index) => (
    <FontAwesomeIcon key={index} icon={faStar} style={starStyle} />
  ));

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <img
              src={selectedImage}
              className="img-fluid rounded"
              alt={productDetails.title}
            />
            <div className="row mt-3">
              {/* Display additional images below the main image */}
              {productDetails.images &&
                productDetails.images.map((image, index) => (
                  <div key={index} className="col-3">
                    <img
                      src={image}
                      className="img-fluid img-thumbnail "
                      alt={`Thumbnail ${index + 1}`}
                      onClick={() => handleImageClick(image)}
                      style={{
                        cursor: "pointer",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="col-md-8">
            <h2>{productDetails.title}</h2>
            <p>{productDetails.description}</p>
            <div>
              <span style={{ display: "inline", marginBottom: "5px" }}>
                {stars}
              </span>
              <span
                style={{
                  maxHeight: "100px",
                  overflow: "hidden",
                  display: "inline",
                }}
              >
                ({productDetails.rating})
              </span>
            </div>
            <hr />
            <h4>{formattedPrice}</h4>
            <p>{productDetails.price}</p>
            <hr />
            {productDetails.stock !== 0 ? (
              <span
                className="badge  mx-4 px-3  rounded-5"
                style={{
                  background: "green",
                }}
              >
                On stock
              </span>
            ) : (
              <span
                className="badge  mx-4 px-3  rounded-5"
                style={{
                  background: "red",
                }}
              >
                out stock{" "}
              </span>
            )}
            <h6 className="text-black-50 bg-white mt-1">More information</h6>
            <span
              className="badge  px-3  rounded-5 text-body-secondary"
              style={{ background: " #e9ecef" }}
            >
              {productDetails.brand}
            </span>
            <span
              className="badge  mx-4 px-3  rounded-5 text-body-secondary"
              style={{ background: " #e9ecef" }}
            >
              {productDetails.category}
            </span>
            <hr />
            <div className="d-flex ">
              <button
                type="button"
                className="btn btn-success rounded-pill px-5 mx-4"
              >
                Buy Now
              </button>
              <button
                type="button"
                className="btn btn-outline-success rounded-pill px-5"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
