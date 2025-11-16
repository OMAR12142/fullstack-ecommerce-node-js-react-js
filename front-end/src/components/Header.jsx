import React from "react";

import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { Homescreen } from "../screens/Homescreen";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  console.log(cartItems);
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="logo" />
              pro shop
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/">
                <Nav.Link href="">Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link href="/login">
                  signup <FaUser />
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/cart">
                <Nav.Link href="/cart">
                  <FaShoppingCart /> cart{" "}
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {" "}
                      {cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                    </Badge>
                  )}{" "}
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
