import React, { useState, useContext } from 'react';
import ProductoContext from '../../Context/contextProducto'; // Asegúrate de que la ruta sea correcta

export const CreateProduct = () => {
  const { createProducto } = useContext(ProductoContext); // Accede a la función createProducto del contexto
  const [formData, setFormData] = useState({
    nombre: '',
    categoria: '',
    precio: '',
    descripcion: '',
    cantidad: '',
    publicadoPor: '',
    codigoempresa: '',
    idAdministrador: '',
    materiales: '',
  });
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProducto(formData, file);
      // Aquí podrías agregar una notificación de éxito o redirigir al usuario
      alert('Producto creado con éxito');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h1>Crear Nuevo Producto</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} required /><br /><br />

        <label htmlFor="categoria">Categoría:</label>
        <input type="text" id="categoria" name="categoria" value={formData.categoria} onChange={handleChange} /><br /><br />

        <label htmlFor="precio">Precio:</label>
        <input type="number" id="precio" name="precio" value={formData.precio} step="0.01" onChange={handleChange} required /><br /><br />

        <label htmlFor="descripcion">Descripción:</label>
        <textarea id="descripcion" name="descripcion" value={formData.descripcion} onChange={handleChange} /><br /><br />

        <label htmlFor="cantidad">Cantidad:</label>
        <input type="number" id="cantidad" name="cantidad" value={formData.cantidad} onChange={handleChange} /><br /><br />

        <label htmlFor="publicadoPor">Publicado Por:</label>
        <input type="text" id="publicadoPor" name="publicadoPor" value={formData.publicadoPor} onChange={handleChange} /><br /><br />

        <label htmlFor="codigoempresa">Código Empresa:</label>
        <input type="text" id="codigoempresa" name="codigoempresa" value={formData.codigoempresa} onChange={handleChange} /><br /><br />

        <label htmlFor="idAdministrador">ID Administrador:</label>
        <input type="text" id="idAdministrador" name="idAdministrador" value={formData.idAdministrador} onChange={handleChange} /><br /><br />

        <label htmlFor="materiales">Materiales:</label>
        <input type="text" id="materiales" name="materiales" value={formData.materiales} onChange={handleChange} /><br /><br />

        <label htmlFor="urlProductoImg">Imagen del Producto:</label>
        <input type="file" id="urlProductoImg" name="urlProductoImg" onChange={handleFileChange} /><br /><br />

        <button type="submit">Enviar</button>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};
