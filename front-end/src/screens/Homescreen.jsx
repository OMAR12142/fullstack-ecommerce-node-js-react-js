import { Col, Row, Spinner } from "react-bootstrap";
import { Product } from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import Loader from "../components/loader.jsx";
import Message from "../components/Message.jsx";

//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       const { data } = await axios.get("/api/products");
//       setProducts(data);
//     };
//     fetchProducts();
//   }, []);

export const Homescreen = () => {
  const { data: products, isLoading, isError } = useGetProductsQuery();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {" "}
          {isError.data?.message || isError.error}
        </Message>
      ) : (
        <>
          <h1>Latest Products</h1>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};
