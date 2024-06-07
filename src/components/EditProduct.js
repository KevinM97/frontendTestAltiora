import { useParams } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";


const EditProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Lógica para cargar los datos del producto con el ID obtenido de la URL
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h1>Editar producto</h1>
    </div>
  );
};

export default EditProduct;
