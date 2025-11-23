import { Navbar, Nav, Container, Badge, NavDropdown } from "react-bootstrap";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import nav_logo from "../assets/nav_logo.png";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import SeacrhBox from "./SeacrhBox";

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const HandleLogOut = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header style={{ position: "relative", zIndex: 1030 }}>
      <Navbar
        expand="lg"
        collapseOnSelect
        className="app-navbar-custom"
        style={{
          position: "relative",
          zIndex: 1030,
        }}
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="app-logo-text">
              <img
                src={nav_logo}
                alt="ProShop Logo"
                className="me-2 app-logo-img"
              />
            </Navbar.Brand>
          </LinkContainer>
          <SeacrhBox />

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="app-navbar-toggle"
          />

          {/* Navigation Items */}
          <Navbar.Collapse
            id="basic-navbar-nav"
            style={{ position: "relative", zIndex: 1030 }}
          >
            <Nav className="ms-auto align-items-center app-nav-items">
              <div className="app-search-container"></div>

              <LinkContainer to="/">
                <Nav.Link className="nav-link-custom text-decoration-none">
                  <strong>Home</strong>
                </Nav.Link>
              </LinkContainer>
              {/* Cart Icon */}
              <LinkContainer to="/cart">
                <Nav.Link className="nav-link-custom app-cart-link text-decoration-none">
                  <div className="app-cart-container text-decoration-none">
                    <FaShoppingCart className="app-cart-icon" />
                    <strong className="app-cart-text ">Cart</strong>
                    {cartItems.length > 0 && (
                      <Badge pill className="app-cart-badge bg-black">
                        {cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </div>
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <>
                  <NavDropdown
                    title={
                      <strong className="app-user-name text-decoration-none ">
                        <FaUser className="me-1 text-decoration-none" />
                        {userInfo.name}
                      </strong>
                    }
                    id="username"
                    className="nav-link-custom app-user-dropdown text-decoration-none"
                    style={{ position: "relative", zIndex: 1031 }}
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item className="app-dropdown-item text-decoration-none">
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={HandleLogOut}
                      className="app-dropdown-item app-logout-item text-decoration-none"
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>

                  {userInfo.isAdmin && (
                    <NavDropdown
                      title="Admin"
                      id="adminmenu"
                      className="nav-link-custom app-admin-dropdown text-decoration-none"
                      style={{ position: "relative", zIndex: 1031 }}
                    >
                      <LinkContainer to="/admin/productslist">
                        <NavDropdown.Item className="app-dropdown-item">
                          Products
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/orderlist">
                        <NavDropdown.Item className="app-dropdown-item">
                          Orders
                        </NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/admin/userlist">
                        <NavDropdown.Item className="app-dropdown-item">
                          Users
                        </NavDropdown.Item>
                      </LinkContainer>
                    </NavDropdown>
                  )}
                </>
              ) : (
                /* Sign In Link */
                <LinkContainer to="/login">
                  <Nav.Link className="nav-link-custom app-signin-link">
                    <FaUser className="me-1" />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
