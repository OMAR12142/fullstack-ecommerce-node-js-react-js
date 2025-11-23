import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

const PaginationComp = ({ pages, page, isAdmin = false, keyword = "" }) => {
  if (pages <= 1) return null; // لو صفحة واحدة مش محتاج Pagination

  return (
    <Pagination className="app-pagination">
      {[...Array(pages).keys()].map((x) => {
        let link;

        if (isAdmin) {
          link = `/admin/productslist/${x + 1}`;
        } else {
          if (keyword) {
            link = `/allproducts/search/${keyword}/page/${x + 1}`;
          } else {
            link = `/allproducts/page/${x + 1}`;
          }
        }

        return (
          <Pagination.Item
            key={x + 1}
            active={x + 1 === page}
            as={Link}
            to={link}
          >
            {x + 1}
          </Pagination.Item>
        );
      })}
    </Pagination>
  );
};

export default PaginationComp;
