import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext'; // Asegúrate de importar tu contexto de autenticación
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';

const Profile = () => {
  const { isAuthenticated, userRole } = useContext(AuthContext); // Agregar el rol del usuario
  const [userData, setUserData] = useState(null);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      const fetchProfile = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No hay sesión activa. Por favor, inicia sesión.');
          return;
        }

        try {
          const userResponse = await axios.get(`${API_URL}/users/profile`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUserData(userResponse.data);

          const purchasesResponse = await axios.get(`${API_URL}/compras/historial`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setPurchaseHistory(purchasesResponse.data.length > 0 ? purchasesResponse.data : []);
        } catch (err) {
          setError(err.response?.data?.error || 'Error al obtener los datos del usuario'); 
        }
      };

      fetchProfile();
    }
  }, [isAuthenticated, navigate]);

  // Función para manejar el clic del botón de administración
  const handleAdminClick = () => {
    navigate('/admin/products'); // Redirige a la vista de administración de productos
  };

  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!userData) return <div className="text-center text-gray-500">Cargando...</div>;

  return (
    <div className="container mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-slate-900 mb-4">Perfil de Usuario</h2>
      <div className="text-lg">
        <p><strong>Nombre:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
      </div>

      {userRole === 'admin' && ( // Condicional para mostrar el botón solo a administradores
        <button
          onClick={handleAdminClick}
          className="mt-4 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Administrar Productos
        </button>
      )}

      <h3 className="text-2xl font-semibold text-slate-800 mt-6">Historial de Compras</h3>
      {purchaseHistory.length > 0 ? (
        <ul className="mt-4 space-y-4">
          {purchaseHistory.map((purchase) => (
            <li key={purchase.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <p className="font-semibold">Compra ID: {purchase.id} - Fecha: {new Date(purchase.purchase_date).toLocaleDateString()}</p>
              <ul className="list-disc list-inside mt-2">
                {purchase.items.map(item => (
                  <li key={item.product_id} className="text-sm text-gray-700">
                    {item.product_name} - Cantidad: {item.quantity} - Precio: ${item.price}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600 mt-4">No hay historial de compras.</p>
      )}
    </div>
  );
};

export default Profile;
