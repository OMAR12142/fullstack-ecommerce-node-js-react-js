import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import mavin from "../assets/mavin.jpg";
export const LandingComp = () => {
  return (
    <div className="app-hero-section bg-dark text-white py-5">
      <Container>
        <Row className="align-items-center mx-5 min-vh-50">
          <Col lg={6}>
            <h1 className="display-4 fw-bold mb-3">
              Welcome to <strong className="text-uppercase">mavin</strong>
            </h1>
            <p className="lead mb-4">
              Discover the latest products with amazing quality and competitive
              prices. Shop now and experience the best online shopping
              experience.
            </p>
            <div className="d-flex gap-3">
              <Button
                as={Link}
                size="lg"
                className="px-4 bg-white text-black text-decoration-none"
              >
                Shop Now
              </Button>
              <Button
                as={Link}
                to="/about"
                variant="outline-light"
                size="lg"
                className="px-4 text-decoration-none"
              >
                Learn More
              </Button>
            </div>
          </Col>
          <Col lg={6}>
            <div className="text-center">
              <img src={mavin} alt="Shopping" />
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
