import React, { Fragment, useEffect } from "react";
import { MetaData } from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productsAction";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";

const AddProduct = () => {
const dispatch = useDispatch();

const { products} = useSelector((state) => state.products);

useEffect(() => {
  dispatch(getProducts());
}, [dispatch]);

  return (
    <Fragment>
        <MetaData titulo={'Test add products'}/>
      <section id="products" className="container mt-5">
          <h1>Agregar Producto</h1>
      <div className="d-flex justify-content-between mb-3">
      <div></div>
          <button data-bs-toggle='modal' data-bs-target='#modalProducts' className="btn btn-primary">
            <FaPlus /> Agregar
          </button>
        </div>
        <table className="table table-striped mt-5">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Código</th>
              <th scope="col">Precio</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((productElement) => (
                <tr key={productElement.id}>
                  <td>{productElement.nombre}</td>
                  <td>{productElement.codigo}</td>
                  <td>${productElement.precio}</td>
                  <td>
                    <Link
                      to={`/edit-product/${productElement.id}`}
                      className="btn btn-primary btn-sm mr-2"
                    >
                      <FaEdit />
                    </Link>
                    <button className="btn btn-danger btn-sm">
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No tiene productos
                </td>
              </tr>
            )}
          </tbody>
        </table>

        
      </section>
    </Fragment>
  );
};

export default AddProduct;
