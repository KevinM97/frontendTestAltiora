import React, { useState, useEffect } from "react";
import { MetaData } from "./layout/MetaData";
import axios from "axios";

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");

  const [showModal, setShowModal] = useState(false);

  const fetchClientes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:5000/api/altiora/v1/Customer/list"
      );
      setClientes(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleAgregarCliente = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/altiora/v1/Customer/registerCustomer", {
        nombre: nombre,
        apellido: apellido,
      });
      setShowModal(false);
      alert("Cliente agregado correctamente");
      // Refrescar la lista de clientes
      fetchClientes();
    } catch (err) {
      alert("Error al agregar el cliente: " + err.message);
    }
  };

  return (
    <>
      <MetaData titulo={"Lista de Clientes"} />
      <section id="clientes" className="container mt-5">
        <h1>Clientes</h1>
        <div className="d-flex justify-content-between mb-3">
          <div></div>
          <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
          Agregar Cliente
        </button>
        </div>
        {loading ? (
          <p>Cargando clientes...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <table className="table table-striped mt-5">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
              </tr>
            </thead>
            <tbody>
              {clientes.map((cliente) => (
                <tr key={cliente.id}>
                  <td>{cliente.id}</td>
                  <td>{cliente.nombre}</td>
                  <td>{cliente.apellido}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
      <div className={`modal ${showModal ? "show" : ""}`} tabIndex="-1" role="dialog" style={{ display: showModal ? "block" : "none" }}>
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Agregar Cliente</h5>
              <button type="button" className="close" onClick={() => setShowModal(false)} aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAgregarCliente}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="apellido" className="form-label">Apellido:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="apellido"
                    value={apellido}
                    onChange={(e) => setApellido(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Guardar</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className={`modal-backdrop fade ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }}></div>
    </>
  );
};

export default Clientes;
