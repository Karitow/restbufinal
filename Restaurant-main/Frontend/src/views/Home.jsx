import React from 'react';
import { Link } from 'react-router-dom'; 
import bannerImage from '../assets/img/Banner_Home.webp';
import  Carousel from '../components/Carousel.jsx';
import burguerhome from '../assets/img/burguer.jpg';
import freshsushi from '../assets/img/frescossushi.jpg';
import postre from '/src/assets/img/postres.jpg';

const Home = () => {
  const images = [
    burguerhome,
    freshsushi,
    postre,
  ];

  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden flex-grow">
      <img 
        src={bannerImage} 
        alt="Banner" 
        className="w-full h-full object-cover" 
      />
      {/* Superposición de color */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
      
      {/* Contenido del banner */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold text-shadow-lg">Bienvenidos a Sushi & Burger Home</h1>
        <p className="mt-2 text-lg md:text-xl text-shadow-md">Deliciosas comidas para todos los gustos</p>
        <Link to="/Menu">
          <button className="mt-4 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Ver Menú
          </button>
        </Link>
      </div>
    <div className="mt-16">
    <Carousel images={images} />
  </div>
</div>
  );
};

export default Home;
