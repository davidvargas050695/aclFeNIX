import React from "react";
import "./table.css";
import Pagination from "./pagination"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from '@fortawesome/free-solid-svg-icons';

const Table = ({ title, rows = [], columns = [], renderRow, icon, currentPage, totalItems, itemsPerPage, onPageChange, onRowClick, selectedRow, onRefresh }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="sales-table-container">
      <div className="sales-table-header">
        <div className="header-left">
          <div className="icon-container-table">
            <FontAwesomeIcon icon={icon} className="icon" />
          </div>
          <h3>{title}</h3>
          <FontAwesomeIcon
            icon={faSync}
            className="shortcut-icon-actually"
            onClick={onRefresh} // Llama a la función de actualización cuando se hace clic en el ícono
            style={{ cursor: 'pointer' }} // Añade un cursor de mano para indicar que es interactivo
          />
        </div>

      </div>
      <table className="sales-table">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((item, index) => (
              <tr
                key={index}
                onClick={() => onRowClick && onRowClick(item)} // Solo ejecuta onRowClick si está definida
                className={item === selectedRow ? "selected-row" : ""} // Aplica la clase si la fila está seleccionada
              >
                {renderRow(item, index)}
                {columns.map((col) => col.render && <td key={col.key}>{col.render(item)}</td>)}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="no-data">No existen datos</td>
            </tr>
          )}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Table;
