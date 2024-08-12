import React, { useState } from "react";
import "./table.css";
import { Tooltip } from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faEdit, faTrashAlt, faBuilding } from "@fortawesome/free-solid-svg-icons";
import Pagination from "./pagination"; // Importa el componente de paginación

const SalesByCountryTable = ({ isEdit, isDelete, isCompany }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 3; // Asume que tienes 3 páginas para este ejemplo

  const data = [
    {
      country: "United State",
      sales: 2500,
      value: "$230,900",
      bounce: "29.9%",
      flag: "🇺🇸",
    },
    {
      country: "Germany",
      sales: 3900,
      value: "$440,000",
      bounce: "40.22%",
      flag: "🇩🇪",
    },
    {
      country: "Great Britain",
      sales: 1400,
      value: "$190,700",
      bounce: "23.44%",
      flag: "🇬🇧",
    },
    {
      country: "Brasil",
      sales: 562,
      value: "$143,960",
      bounce: "32.14%",
      flag: "🇧🇷",
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="sales-table-container">
      <div className="sales-table-header">
        <div className="header-left">
          <div className="icon-container-table">
            <FontAwesomeIcon icon={faUser} className="icon" />
          </div>
          <h3>Lista de Usuarios</h3>
        </div>
        <div className="header-right">
          <input
            type="text"
            className="search-input"
            placeholder="Buscar..."
          />
        </div>
      </div>
      <table className="sales-table">
        <thead>
          <tr>
            <th>Flag</th>
            <th>Country</th>
            <th>Sales</th>
            <th>Value</th>
            <th>Acciones </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="flag-column">{item.flag}</td>
              <td>{item.country}</td>
              <td>{item.sales}</td>
              <td>{item.value}</td>
              <td>
                <div className="button-container">
                  {isEdit && (
                    <>
                      <Tooltip id="edit-tooltip" className="custom-tooltip" />
                      <button
                        data-tooltip-id="edit-tooltip"
                        className="icon-button edit-button"
                        data-tooltip-content="Editar"
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </>
                  )}
                  {isDelete && (
                    <>
                      <Tooltip id="delete-tooltip" className="custom-tooltip" />
                      <button
                        data-tooltip-id="delete-tooltip"
                        className="icon-button delete-button"
                        data-tooltip-content="Eliminar"
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </button>
                    </>
                  )}
                  {isCompany && (
                    <>
                      <Tooltip id="company-tooltip" className="custom-tooltip" />
                      <button
                        data-tooltip-id="company-tooltip"
                        className="icon-button company-button"
                        data-tooltip-content="Compañías"
                      >
                        <FontAwesomeIcon icon={faBuilding} />
                      </button>
                    </>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Agregar Paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default SalesByCountryTable;
