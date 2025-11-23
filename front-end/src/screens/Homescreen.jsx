import { Col, Row, Spinner } from "react-bootstrap";
import { Product } from "../components/Product";
import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import Loader from "../components/loader.jsx";
import Message from "../components/Message.jsx";
import { Link, useParams } from "react-router-dom";
import PaginationComp from "../components/PaginationComp.jsx";
import { LandingComp } from "../components/LandingComp.jsx";
import { FeaturesSection } from "../components/FeaturesSection.jsx";
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     const fetchProducts = async () => {
//       const { data } = await axios.get("/api/products");
//       setProducts(data);
//     };
//     fetchProducts();
//   }, []);

export const Homescreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({
    keyword,
    pageNumber,
  });
  return (
    <>
      <LandingComp />
      {keyword && (
        <Link to="/" className="btn btn-light mb-4">
          back
        </Link>
      )}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError.data?.message || isError.error}
        </Message>
      ) : (
        <>
          <h1 className="mt-5 text-black">Latest Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <PaginationComp
            pages={data.pages}
            page={data.page}
            isAdmin={false}
            keyword={keyword ? keyword : ""}
          />
        </>
      )}
    </>
  );
};
