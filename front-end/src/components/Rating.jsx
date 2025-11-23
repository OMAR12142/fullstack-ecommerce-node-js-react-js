import React from "react";
import { FaRegStar, FaStarHalfAlt, FaStar } from "react-icons/fa";

const Rating = ({ value, text }) => {
  return (
    <div className="app-rating-container">
      <span>
        {value >= 1 ? (
          <FaStar className="app-star-icon" />
        ) : value >= 0.5 ? (
          <FaStarHalfAlt className="app-star-icon" />
        ) : (
          <FaRegStar className="app-star-icon-empty" />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <FaStar className="app-star-icon" />
        ) : value >= 1.5 ? (
          <FaStarHalfAlt className="app-star-icon" />
        ) : (
          <FaRegStar className="app-star-icon-empty" />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <FaStar className="app-star-icon" />
        ) : value >= 2.5 ? (
          <FaStarHalfAlt className="app-star-icon" />
        ) : (
          <FaRegStar className="app-star-icon-empty" />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <FaStar className="app-star-icon" />
        ) : value >= 3.5 ? (
          <FaStarHalfAlt className="app-star-icon" />
        ) : (
          <FaRegStar className="app-star-icon-empty" />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <FaStar className="app-star-icon" />
        ) : value >= 4.5 ? (
          <FaStarHalfAlt className="app-star-icon" />
        ) : (
          <FaRegStar className="app-star-icon-empty" />
        )}
      </span>
      <span className="app-rating-text ms-2">{text && text}</span>{" "}
      {/* 👈🏻 فئة مخصصة للنص */}
    </div>
  );
};

export default Rating;
