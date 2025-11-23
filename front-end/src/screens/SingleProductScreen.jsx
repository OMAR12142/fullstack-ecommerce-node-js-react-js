import { Link, useParams, useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, ListGroup, Row } from "react-bootstrap";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productDetailsApiSlice";
import Loader from "../components/loader";
import Message from "../components/Message";
import { useState } from "react";
import { addToCart } from "../slices/cartSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useCreateProductReviewMutation } from "../slices/productsApiSlice.js";
import { toast } from "react-toastify";

export const SingleProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    isError,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingReview }] =
    useCreateProductReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      toast.success("Review Submitted Successfully");
      setRating(0);
      setComment("");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  function addToCartHandler() {
    dispatch(addToCart({ ...product, quantity }));
    navigate("/cart");
  }

  return (
    <>
      <Link className="btn btn-light my-3 app-go-back-btn" to="/">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">{error.data?.message || error.error}</Message>
      ) : (
        <>
          <Row className="app-product-details-row">
            <Col md={5}>
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid app-product-image"
              />
            </Col>

            <Col md={4} className="app-product-info-col">
              <ListGroup variant="flush" className="border-0">
                <ListGroup.Item className="border-0 p-0 mb-3">
                  <h3 className="app-product-name">{product.name}</h3>
                </ListGroup.Item>

                {/* 1. التقييم */}
                <ListGroup.Item className="border-0 p-0 mb-3">
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>

                {/* 2. الوصف */}
                <ListGroup.Item className="border-0 p-0 app-product-description">
                  <p>{product.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3} className="app-cart-box-col">
              <Card className="app-cart-card border-0 shadow-sm">
                <ListGroup variant="flush">
                  {/* 3. السعر */}
                  <ListGroup.Item className="app-price-item">
                    <Row>
                      <Col className="fw-bold"> Price :</Col>
                      <Col>
                        <strong className="app-price-value">
                          ${product.price}{" "}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* 4. الحالة */}
                  <ListGroup.Item>
                    <Row>
                      <Col className="fw-bold"> Status :</Col>
                      <Col>
                        <strong
                          className={
                            product.countInStock > 0
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {product.countInStock > 0
                            ? `In Stock `
                            : "Out Of Stock"}
                        </strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {/* 5. الكمية */}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row className="align-items-center">
                        <Col className="fw-bold">Quantity</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={quantity}
                            onChange={(e) => {
                              setQuantity(Number(e.target.value));
                            }}
                            className="app-qty-select"
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item className="p-3">
                    <Button
                      className="app-add-to-cart-btn w-100" // 👈🏻 تحديد عرض 100%
                      type="button"
                      onClick={addToCartHandler}
                      disabled={product.countInStock === 0}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>

          {/* 6. قسم المراجعات */}
          <Row className="my-5 app-reviews-section">
            <Col md={6}>
              <h2 className="app-reviews-heading">REVIEWS</h2>
              {product.reviews.length === 0 && (
                <Message>No reviews yet</Message>
              )}
              <ListGroup variant="flush" className="app-review-list">
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id} className="app-review-item">
                    <strong className="d-block mb-1">{review.name}</strong>
                    <Rating value={review.rating} />
                    <p className="text-muted small my-1">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                    <p className="mt-2">{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item className="app-review-form-item">
                  {loadingReview && <Loader />}
                  {userInfo ? (
                    <>
                      <h2 className="app-review-form-heading">
                        Write A Review
                      </h2>
                      <Form onSubmit={submitHandler}>
                        <Form.Group controlId="rating" className="my-2">
                          <Form.Label className="fw-bold">Rating</Form.Label>
                          <Form.Control
                            as="select"
                            value={rating}
                            onChange={(e) => setRating(Number(e.target.value))}
                            className="app-select-control"
                          >
                            <option value="">Select...</option>
                            <option value="1">1 - Poor</option>
                            <option value="2">2 - Fair</option>
                            <option value="3">3 - Good</option>
                            <option value="4">4 - Very Good</option>
                            <option value="5">5 - Excellent</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group controlId="comment" className="my-2">
                          <Form.Label className="fw-bold">Comment</Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={5}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></Form.Control>
                        </Form.Group>
                        <Button
                          type="submit"
                          className="app-submit-review-btn my-2 w-100"
                          disabled={loadingReview}
                        >
                          Submit Review
                        </Button>
                      </Form>
                    </>
                  ) : (
                    <Message>
                      Please <Link to="/login">log in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
