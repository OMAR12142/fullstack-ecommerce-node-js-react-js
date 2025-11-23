import { Container, Row, Col } from "react-bootstrap";
import {
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
  FaAward,
} from "react-icons/fa";

export const FeaturesSection = () => {
  const features = [
    {
      icon: <FaAward size={50} className="text-dark" />,
      title: "PREMIUM QUALITY",
      description: "Curated selection of exceptional products",
    },
    {
      icon: <FaShippingFast size={50} className="text-dark" />,
      title: "EXPRESS DELIVERY",
      description: "Fast and reliable shipping worldwide",
    },
    {
      icon: <FaShieldAlt size={50} className="text-dark" />,
      title: "SECURE TRANSACTION",
      description: "100% protected payments",
    },
    {
      icon: <FaHeadset size={50} className="text-dark" />,
      title: "DEDICATED SUPPORT",
      description: "24/7 premium customer service",
    },
  ];

  return (
    <Container className="my-5 py-5 bg-light">
      <Row className="mb-5">
        <Col>
          <h2 className="text-center fw-black text-dark display-5 mb-3">
            WHY CHOOSE US
          </h2>
          <p className="text-center text-muted fs-5">THE PREMIUM DIFFERENCE</p>
        </Col>
      </Row>

      <Row>
        {features.map((feature, index) => (
          <Col key={index} md={6} lg={3} className="text-center mb-5">
            <div className="feature-icon mb-4">{feature.icon}</div>
            <h5 className="fw-bold text-dark mb-3 fs-6">{feature.title}</h5>
            <p className="text-muted mb-0">{feature.description}</p>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
