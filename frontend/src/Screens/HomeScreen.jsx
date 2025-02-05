import React from "react";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import { logout } from "../slices/authSlice";
import { useDispatch } from "react-redux";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  const dispatch = useDispatch();

  const Last = () => {
    dispatch(logout());
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>{error?.data.message || error.error}</div>
      ) : (
        <>
          <h1>Latest Products</h1>
          <button onClick={Last}>Show More</button>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
