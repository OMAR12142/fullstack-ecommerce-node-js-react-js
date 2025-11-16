import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export const Product = ({ product }) => {
  return (
    <div>
      <Card className="p-3 my-3 rounded">
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image}></Card.Img>
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as="div" className="product-title">
              <strong>{product.name}</strong>
            </Card.Title>
            <Card.Title as="div">
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </Card.Title>
          </Link>
        </Card.Body>
        <Card.Text as="h3">$ {product.price}</Card.Text>
      </Card>
    </div>
  );
};
