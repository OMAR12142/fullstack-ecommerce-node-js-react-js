import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";

export const Product = ({ product }) => {
  return (
    <Card className="app-product-card my-3 p-0 border-0 shadow-sm">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          src={product.image}
          variant="top"
          className="card-image-custom"
          style={{
            height: "200px",
            objectFit: "cover",
            width: "100%",
          }}
        />
      </Link>

      <Card.Body className="p-3 d-flex flex-column">
        <Link
          to={`/product/${product._id}`}
          className="text-decoration-none text-black flex-grow-1"
        >
          <Card.Title
            as="div"
            className="product-title-custom fw-bold mb-1"
            style={{
              minHeight: "48px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {product.name}
          </Card.Title>
        </Link>

        {/* منطقة التقييم */}
        <div className="app-product-rating mb-2 mt-auto">
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </div>

        {/* السعر */}
        <Card.Text as="h4" className="app-product-price text-black fw-bold m-0">
          $ {product.price}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
