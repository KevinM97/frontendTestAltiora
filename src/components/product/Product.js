import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product, col }) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link>{product.nombre}</Link>
          </h5>
          <span>{product.codigo}</span>
          <p className="card-text">$ {product.precio} </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
