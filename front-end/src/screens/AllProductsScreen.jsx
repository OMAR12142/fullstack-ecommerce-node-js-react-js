import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import Product from "../components/Product";
import Loader from "../components/loader";
import Message from "../components/Message";
import PaginationComp from "../components/PaginationComp";
import { useParams } from "react-router-dom";

export const AllProductsScreen = () => {
  const [brand, setBrand] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const { pageNumber = 1 } = useParams();

  const { data, isLoading, isError } = useGetProductsQuery({ pageNumber });

  const filteredProducts = data?.products.filter((p) => {
    return (
      (brand ? p.brand === brand : true) &&
      (maxPrice ? p.price <= maxPrice : true)
    );
  });

  return (
    <>
      <h1 className="mt-4 text-black">
        <strong> All Products</strong>
      </h1>

      <Row className="mb-4">
        <Col md={3}>
          <label className="form-label">Brand</label>
          <select
            className="form-select"
            onChange={(e) => setBrand(e.target.value)}
          >
            <option value="">All</option>
            <option value="Clothes">Clothes</option>
            <option value="watches">watches</option>
            <option value="bag">bags</option>
            <option value="headphones">headphones</option>
            <option value="Phones">Phones</option>
          </select>
        </Col>

        <Col md={3}>
          <label className="form-label">Max Price</label>
          <input
            type="number"
            className="form-control"
            placeholder="e.g. 500"
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">Something went wrong</Message>
      ) : (
        <>
          <Row>
            {filteredProducts.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>

          <PaginationComp
            pages={data.pages}
            page={data.page}
            keyword=""
            isAdmin={false}
          />
        </>
      )}
    </>
  );
};
