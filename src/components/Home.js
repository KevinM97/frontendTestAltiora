import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { MetaData } from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  getProducts,
  deleteProduct,
  updateProduct,
} from "../actions/productsAction";
import { FaEdit, FaTrashAlt, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState(0.1);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleRegisterProduct = async (e) => {
    e.preventDefault();
    const productData = {
      nombre: nombre,
      precio: precio,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/altiora/v1/Product/registerProduct",
        productData
      );
      console.log("Respuesta de la API:", response.data);
      alert("Producto registrado con éxito");
      setNombre("");
      setPrecio(0.1);
      window.$("#modalProducts").modal("hide");
      dispatch(getProducts()); // Actualizar la lista de productos después de agregar uno nuevo
    } catch (err) {
      alert("Error registrando el producto: " + err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await dispatch(deleteProduct(productId)).unwrap();
      alert("Producto eliminado con éxito");
      window.location.reload(); // Recargar la página para reflejar los cambios
    } catch (err) {
      alert("Error eliminando el producto: " + err);
    }
  };

  const handleEditProduct = async (e) => {
    e.preventDefault();
    try {
      // Código para editar el producto
    } catch (err) {
      alert("Error actualizando el producto: " + err);
    }
  };

  return (
    <Fragment>
      <MetaData titulo={"Test products"} />
      <section id="products" className="container mt-5">
        <h1>Productos Disponibles</h1>
        <div className="d-flex justify-content-between mb-3">
          <div></div>
          <button
            data-toggle="modal"
            data-target="#modalProducts"
            className="btn btn-primary"
          >
            <FaPlus /> Agregar
          </button>
        </div>
        <table className="table table-striped mt-5">
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Nombre</th>
              <th scope="col">Precio</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((productElement) => (
                <tr key={productElement.id}>
                  <td>{productElement.codigo}</td>
                  <td>{productElement.nombre}</td>
                  <td>${productElement.precio}</td>
                  <td>
                    <Link
                      to={`/editproduct/${productElement.id}`}
                      className="btn btn-primary btn-sm mr-2"
                    >
                      <FaEdit />
                    </Link>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteProduct(productElement.id)}
                    >
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
        <div id="modalProducts" className="modal fade" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Añadir Producto</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleRegisterProduct}>
                  <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombreProducto"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="precio" className="form-label">
                      Precio:
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="precioProducto"
                      value={precio}
                      onChange={(e) => setPrecio(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Guardar
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
