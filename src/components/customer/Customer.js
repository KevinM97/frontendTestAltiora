import React from "react";
import { Link } from "react-router-dom";

const Customer = ({ customer, col }) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link>{customer.nombre}</Link>
          </h5>
          <span>{customer.apellido}</span>
        </div>
      </div>
    </div>
  );
};

export default Customer;
