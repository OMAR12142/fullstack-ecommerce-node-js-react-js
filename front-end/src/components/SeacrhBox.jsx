import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchBox = () => {
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || "");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      setKeyword("");
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={submitHandler} className="app-search-form">
      <div className="app-search-wrapper">
        <div className="app-search-input-group">
          <FaSearch className="app-search-prefix-icon" />
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            value={keyword}
            placeholder="Search for products, brands and more..."
            className="app-search-input"
          />
        </div>
        <Button type="submit" className="app-search-submit-btn">
          Search
        </Button>
      </div>
    </Form>
  );
};

export default SearchBox;
