import React, { createContext, useState, useEffect } from 'react';

const ProductoContext = createContext();

export const ProductoProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [userId, setUserId] = useState(null);

    // Función para obtener el ID del usuario del localStorage
    const getUserIdFromLocalStorage = () => {
        const user = JSON.parse(localStorage.getItem('user')); // Asegúrate de que 'user' es el campo correcto
        return user ? user.id : null; // Ajustado para retornar user.id directamente
    };

    // Inicializa el ID del usuario al montar el componente
    useEffect(() => {
        const id = getUserIdFromLocalStorage();
        setUserId(id);
        setLoading(false);
    }, []);

    // Función para crear un producto
    const createProducto = async (productData, file) => {
        const formData = new FormData();
        Object.keys(productData).forEach(key => formData.append(key, productData[key]));
        if (file) formData.append('urlProductoImg', file); // Nombre del campo del archivo

        try {
            const response = await fetch('https://backtesteo.onrender.com/api/producto/nuevoProducto', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error ${response.status}: ${response.statusText}. Detalle: ${errorText}`);
            }

            const result = await response.json();
            return result;
        } catch (err) {
            console.error('Error en createProducto:', err);
            setError(`Error al crear el producto: ${err.message}`);
            throw err;
        }
    };

    // Función para obtener un producto por ID
    const getProducto = async (idProducto) => {
        try {
            const response = await fetch(`https://backtesteo.onrender.com/api/producto/obtenerProducto/${idProducto}`);
            if (!response.ok) throw new Error('Error al obtener el producto');
            const result = await response.json();
            return result;
        } catch (err) {
            setError(err.message);
        }
    };

    // Función para obtener productos por idAdministrador
    const getProductosByIdAdministrador = async () => {
        if (!userId) {
            setError('Usuario no autenticado');
            return;
        }

        try {
            const response = await fetch(`https://backtesteo.onrender.com/api/producto/obtenerPorAdministrador/${userId}`);
            if (!response.ok) throw new Error('Error al obtener productos');
            const result = await response.json();
            setProductos(result);
        } catch (err) {
            setError(err.message);
        }
    };

    // Función para obtener productos por codigoEmpresa
    const getProductosByCodigoEmpresa = async (codigoempresa) => {
        try {
            const response = await fetch(`https://backtesteo.onrender.com/api/producto/obtenerPorEmpresa/${codigoempresa}`);
            if (!response.ok) throw new Error('Error al obtener productos');
            const result = await response.json();
            setProductos(result);
        } catch (err) {
            setError(err.message);
        }
    };

    // Función para actualizar un producto
    const updateProducto = async (idProducto, productoData, file) => {
        if (!userId) {
            setError('Usuario no autenticado');
            return;
        }

        const formData = new FormData();
        Object.keys(productoData).forEach(key => formData.append(key, productoData[key]));
        formData.append('idAdministrador', userId); // Agregar el id del usuario al FormData
        if (file) formData.append('urlProductoImg', file); // Nombre del campo del archivo

        try {
            const response = await fetch(`https://backtesteo.onrender.com/api/producto/actualizarProducto/${idProducto}`, {
                method: 'PUT',
                body: formData,
            });
            if (!response.ok) throw new Error('Error al actualizar el producto');
            await response.json();
        } catch (err) {
            setError(err.message);
        }
    };

    // Función para eliminar un producto
    const deleteProducto = async (idProducto) => {
        try {
            const response = await fetch(`https://backtesteo.onrender.com/api/producto/eliminar/${idProducto}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Error al eliminar el producto');
            await response.json();
            setProductos(prevProductos => prevProductos.filter(p => p.id !== idProducto));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <ProductoContext.Provider value={{ productos, createProducto, getProducto, getProductosByIdAdministrador, getProductosByCodigoEmpresa, updateProducto, deleteProducto, loading, error }}>
            {children}
        </ProductoContext.Provider>
    );
};

export default ProductoContext;
