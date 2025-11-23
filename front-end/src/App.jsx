import { Container } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Homescreen } from "./screens/Homescreen";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="app-container d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1 py-3 app-main-content">
        <Container fluid="lg" className="h-100">
          <Outlet />
        </Container>
      </main>

      <Footer />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{
          zIndex: 9999,
        }}
      />
    </div>
  );
}

export default App;
