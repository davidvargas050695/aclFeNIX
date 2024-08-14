import React from 'react';
import './Home.css';
import Header from '../../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import Table from '../../components/Table';
import Section from '../../components/Section';

const Home = ({ handleLogout }) => {
  return (
    <div className="home-container">
      {/* Renderiza el Header */}
      <Header onLogout={handleLogout} title='Usuarios' />
      
      {/* Aquí va el resto del contenido de tu Home */}
      <div className="home-content">
      <Section>
           <div className="filter-form">
              <div className="form-group">
                <label htmlFor="license">Contrato</label>
                <input
                  type="text"
                  id="license"
                  placeholder="Contrato"
                />
              </div>
              <div className="form-group">
                <label htmlFor="customer">Cliente</label>
                <input
                  type="text"
                  id="customer"
                  placeholder="Cliente"
                />
              </div>
              <button className="search-button">
                <FontAwesomeIcon icon={faSearch} className="search-icon" />
                Buscar
              </button>
           </div>
         </Section>
        <Table isEdit={true} isDelete={true} isCompany={true} icon={faUser} title='Lista de Usuarios' />
      </div>
    </div>
  );
};

export default Home;
