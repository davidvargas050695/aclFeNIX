import React from 'react';
import './Home.css';
import Header from '../../components/Header';
import Table from '../../components/Table';

const Home = () => {
  return (
    <div className="home-container">
      {/* Renderiza el Header */}
      <Header />
      
      {/* Aquí va el resto del contenido de tu Home */}
      <div className="home-content">
        {/* Agrega tu contenido aquí */}
        <Table isEdit={true} isDelete={true} isCompany={true}  />
      </div>
    </div>
  );
};

export default Home;
