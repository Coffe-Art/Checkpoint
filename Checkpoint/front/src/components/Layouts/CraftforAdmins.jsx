import React, { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { FaPlus, FaSearch, FaEdit, FaTrash } from 'react-icons/fa';
import imageEarring from '../../assets/AretesArtesanales.jpg';
import imageRuana from '../../assets/RuanaArtesanal.jpg';
import imageBracelet from '../../assets/PulserasArtesanales.jpg';
import imageBag from '../../assets/BolsoArtesanal.jpg';
import { Header } from './Header';
import { Footer } from './Footer';

export const CraftforAdmins = () => {
  const [products, setProducts] = useState([
    { id: 1, publicadoPor: 'Empresa A', producto: 'Aretes de Plata', descripcion: 'Aretes artesanales de plata con detalles en turquesa.', stock: 10, precio: 150, imagen: imageEarring, categoria: 'earrings' },
    { id: 2, publicadoPor: 'Empresa B', producto: 'Ruana de Lana', descripcion: 'Ruana tejida a mano con lana de oveja.', stock: 5, precio: 250, imagen: imageRuana, categoria: 'ruanas' },
    { id: 3, publicadoPor: 'Empresa A', producto: 'Aretes de Plata', descripcion: 'Aretes artesanales de plata con detalles en turquesa.', stock: 10, precio: 150, imagen: imageEarring, categoria: 'earrings' },
    { id: 4, publicadoPor: 'Empresa B', producto: 'Ruana de Lana', descripcion: 'Ruana tejida a mano con lana de oveja.', stock: 5, precio: 250, imagen: imageRuana, categoria: 'ruanas' },
    { id: 5, publicadoPor: 'Empresa C', producto: 'Bolso de Cuero', descripcion: 'Bolso de cuero auténtico con diseño exclusivo.', stock: 3, precio: 300, imagen: imageBag, categoria: 'bags' },
    { id: 6, publicadoPor: 'Empresa C', producto: 'Bolso de Cuero', descripcion: 'Bolso de cuero auténtico con diseño exclusivo.', stock: 3, precio: 300, imagen: imageBag, categoria: 'bags' },
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(500);
  const [selectedCompany, setSelectedCompany] = useState('all'); // Empresa seleccionada en el filtro

  const navigate = useNavigate();

  useEffect(() => {
    filterProducts(searchTerm, category, [minPrice, maxPrice], selectedCompany);
  }, [searchTerm, category, minPrice, maxPrice, selectedCompany, products]);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handlePriceChange = () => {
    filterProducts(searchTerm, category, [minPrice, maxPrice], selectedCompany);
  };

  const handleCompanyChange = (e) => {
    setSelectedCompany(e.target.value);
  };

  const filterProducts = (searchTerm, category, [minPrice, maxPrice], selectedCompany) => {
    setFilteredProducts(products.filter(product => {
      const matchesSearch = product.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = category === 'all' || product.categoria === category;
      const matchesPrice = product.precio >= minPrice && product.precio <= maxPrice;
      const matchesCompany = selectedCompany === 'all' || product.publicadoPor === selectedCompany;

      return matchesSearch && matchesCategory && matchesPrice && matchesCompany;
    }));
  };

  const handleEdit = (id) => {
    navigate(`/updateProduct/${id}`);
  };

  const handleDelete = (id) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  // Lista de empresas para el filtro
  const companies = [...new Set(products.map(product => product.publicadoPor))]; // Obtiene empresas únicas

  return (
    <div className="flex flex-col min-h-screen bg-gray-200">
      <Header />
      <div className="flex flex-col md:flex-row flex-1">
        {/* Filtro en la esquina izquierda */}
        <div className={`md:w-1/4 lg:w-1/5 bg-white border rounded-lg overflow-hidden shadow-md p-4 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold">Filtros</h2>
            <button onClick={toggleFilter} className="text-darkyellow text-xl">
              {/* Add icon here if needed */}
            </button>
          </div>
          <div>
            <div className="flex items-center mb-4">
              <label htmlFor="search" className="block text-sm font-bold mb-2"></label>
              <div className="relative flex-1">
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="shadow border rounded w-full py-2 px-3 pr-12"
                />
                <div className="absolute inset-y-0 right-0 flex items-center px-2">
                  <FaSearch className="text-darkpurple" />
                </div>
              </div>
            </div>
            <label htmlFor="category" className="block text-sm font-bold mb-2">Categoría</label>
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              className="shadow border rounded w-full py-2 px-3 mb-4"
            >
              <option value="all">Todos</option>
              <option value="earrings">Aretes</option>
              <option value="ruanas">Ruanas</option>
              <option value="bracelets">Pulseras</option>
              <option value="bags">Bolsos</option>
            </select>
            <label htmlFor="price" className="block text-sm font-bold mb-2">Rango de Precio</label>
            <div className="flex mb-4 items-center">
              <input
                type="number"
                min="0"
                max="500"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                onBlur={handlePriceChange}
                className="shadow border rounded w-1/2 py-2 px-3 mr-2"
              />
              <span> - </span>
              <input
                type="number"
                min="0"
                max="500"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                onBlur={handlePriceChange}
                className="shadow border rounded w-1/2 py-2 px-3 ml-2"
              />
            </div>
            <div className="flex justify-between text-sm mb-4">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>
            <label htmlFor="company" className="block text-sm font-bold mb-2">Empresa</label>
            <select
              id="company"
              value={selectedCompany}
              onChange={handleCompanyChange}
              className="shadow border rounded w-full py-2 px-3 mb-4"
            >
              <option value="all">Todas</option>
              {companies.map((company) => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Productos */}
        <div className="flex-1 p-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white border rounded-lg overflow-hidden shadow-md flex flex-col items-center p-4">
                <img
                  src={product.imagen}
                  alt={product.producto}
                  className="object-cover h-48 w-full mb-4 cursor-pointer"
                  onClick={() => navigate(`/product/${product.id}`)}
                />
                <h3 className="text-lg font-semibold mb-2 text-darkyellow text-center">{product.producto}</h3>
                <p className="text-center"><strong className='text-darkyellow'>ID:</strong> {product.id}</p>
                <p className="text-center"><strong className='text-darkyellow'>Publicado en:</strong  > {product.publicadoPor}</p>
                <p className="text-sm text-darkpurple mb-2 text-center"><strong className='text-darkyellow'>Descripción:</strong> {product.descripcion}</p>
                <p className="text-center"><strong className='text-darkyellow'>Stock:</strong > {product.stock}</p>
                <p className="text-center"><strong className='text-darkyellow'>Precio:</strong> ${product.precio}</p>
                <div className="flex space-x-4 mt-4">
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="text-lightyellow hover:text-yellow-700"
                  >
                    <FaEdit className="text-xl" />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-orange-400 hover:text-red-700"
                  >
                    <FaTrash className="text-xl" />
                  </button>
                </div>
              </div>
            ))}

            
<div className="bg-white border rounded-lg overflow-hidden shadow-md flex flex-col items-center p-4 max-w-sm mx-auto">
              <div className="text-center mb-4">
                <FaPlus className="text-darkyellow text-3xl" />
              </div>
              <div className="text-center">
                <span className="text-black text-sm">¿Quieres agregar un nuevo producto?</span>
                <NavLink to="/CreateProduct" className="text-darkyellow hover:underline text-sm ml-2">
                  Crear Producto
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-white shadow-md">
        
      </footer>
    </div>
  );
};

