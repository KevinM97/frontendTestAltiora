import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { MetaData } from "./layout/MetaData";

const Ordenes = () => {
  // Estado para la lista de órdenes
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para el formulario de agregar orden
  const [nombreCliente, setNombreCliente] = useState("");
  const [total, setTotal] = useState("");

  // Estado para el modal
  const [showModal, setShowModal] = useState(false);

  // Función para obtener las órdenes
  const fetchOrdenes = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/altiora/v1/Order/list"
      );
      setOrdenes(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Efecto para cargar las órdenes al montar el componente
  useEffect(() => {
    fetchOrdenes();
  }, []);

  // Función para agregar una orden
  const handleAgregarOrden = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/altiora/v1/Order/registerOrder",
        {
          nombreCliente: nombreCliente,
          total: total,
        }
      );
      setShowModal(false);
      alert("Orden agregada correctamente");
      // Refrescar la lista de órdenes
      fetchOrdenes();
    } catch (err) {
      alert("Error al agregar la orden: " + err.message);
    }
  };

  return (
    <Fragment>
      <MetaData titulo={"Órdenes"} />
      <section id="ordenes" className="container mt-5">
        <h1>Órdenes</h1>
        <div className="d-flex justify-content-between mb-3">
          <div></div>
          <button
          className="btn btn-primary mb-3"
          onClick={() => setShowModal(true)}
        >
          Agregar Orden
        </button>
        </div>

        <table className="table table-striped mt-3">
          <thead>
            <tr>
              <th scope="col">Código</th>
              <th scope="col">Total</th>
              <th scope="col">Nombre del Cliente</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((orden) => (
              <Fragment key={orden.id}>
                <tr>
                  <td>{orden.codigo}</td>
                  <td>${orden.total}</td>
                  <td>{orden.nombreCustomer} </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </section>
      {/* Modal de Bootstrap para agregar orden */}
      <div
        className={`modal ${showModal ? "show" : ""}`}
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agregar Orden</h5>
              <button
                type="button"
                className="close"
                onClick={() => setShowModal(false)}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAgregarOrden}>
                <div className="mb-3">
                  <label htmlFor="nombreCliente" className="form-label">
                    Nombre del Cliente:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombreCliente"
                    value={nombreCliente}
                    onChange={(e) => setNombreCliente(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="total" className="form-label">
                    Total:
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="total"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
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
      <div
        className={`modal-backdrop fade ${showModal ? "show" : ""}`}
        style={{ display: showModal ? "block" : "none" }}
      ></div>
      {/* Fin del modal */}
    </Fragment>
  );
};

export default Ordenes;
