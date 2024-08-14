import React from "react";
import "./table.css";
import Pagination from "./pagination"; // Asegúrate de que el path sea correcto
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Table = ({ title, rows = [], columns = [], renderRow, icon, currentPage, totalItems, itemsPerPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="sales-table-container">
      <div className="sales-table-header">
        <div className="header-left">
          <div className="icon-container-table">
            <FontAwesomeIcon icon={icon} className="icon" />
          </div>
          <h3>{title}</h3>
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
            {columns.map((col, index) => (
              <th key={index}>{col.title}</th>
            ))}
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((item, index) => (
              <tr key={index}>
                {renderRow(item, index)}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="no-data">No existen datos</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Agregar Paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Table;
