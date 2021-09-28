import React from "react";
import "./featured.css";
const SingleFeatured = ({ image, header, price, new_price }) => {
  return (
    <div
      className="featured"
      style={{ width: "18rem", height: "350px", margin: "auto",objectFit:'contain'}}
    >
      <div className="col-12 h-100">
        <div className="card h-100">
          <img src={image} className="card-img-top" alt={header} />
          <div className="card-body">
            <h5 className="card-title">{header}</h5>
            <p className="card-text">
              <span
                style={{ textDecoration: "line-through" }}
                className="oldprice"
              >
                {price}{" "}
              </span>
              {new_price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleFeatured;
