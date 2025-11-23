import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer bg-black">
      <Container>
        <Row className="app-footer-content bg-black">
          <Col md={4} className="app-footer-section">
            <h5 className="app-footer-heading">
              {" "}
              <strong>mavin</strong>{" "}
            </h5>
            <p className="app-footer-text">
              Your trusted destination for quality products and exceptional
              shopping experience.
            </p>
            <div className="app-social-links">
              <a href="#" className="app-social-link">
                <FaFacebook />
              </a>
              <a href="#" className="app-social-link">
                <FaTwitter />
              </a>
              <a href="#" className="app-social-link">
                <FaInstagram />
              </a>
              <a href="#" className="app-social-link">
                <FaLinkedin />
              </a>
            </div>
          </Col>

          <Col md={4} className="app-footer-section">
            <h5 className="app-footer-heading">Quick Links</h5>
            <ul className="app-footer-links">
              <li>
                <a href="/" className="app-footer-link">
                  Home
                </a>
              </li>
              <li>
                <a href="/allproducts" className="app-footer-link">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="app-footer-link">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="app-footer-link">
                  Contact
                </a>
              </li>
            </ul>
          </Col>

          <Col md={4} className="app-footer-section">
            <h5 className="app-footer-heading">Customer Service</h5>
            <ul className="app-footer-links">
              <li>
                <a href="/shipping" className="app-footer-link">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="app-footer-link">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="app-footer-link">
                  Terms of Service
                </a>
              </li>
            </ul>
          </Col>
        </Row>

        <Row>
          <Col className="text-center app-footer-bottom">
            <p className="app-copyright">
              &copy; {currentYear} omarselema. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
