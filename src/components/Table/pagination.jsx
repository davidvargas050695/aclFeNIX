import React from "react";
import "./pagination.css";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPagesToShow = 5;
  let startPage, endPage;

  if (totalPages <= maxPagesToShow) {
    // Mostrar todas las páginas si hay menos o igual a maxPagesToShow
    startPage = 1;
    endPage = totalPages;
  } else {
    // Calcular el rango de páginas a mostrar
    const maxPagesBeforeCurrentPage = Math.floor(maxPagesToShow / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxPagesToShow / 2) - 1;

    if (currentPage <= maxPagesBeforeCurrentPage) {
      // Mostrar las primeras páginas
      startPage = 1;
      endPage = maxPagesToShow;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // Mostrar las últimas páginas
      startPage = totalPages - maxPagesToShow + 1;
      endPage = totalPages;
    } else {
      // Mostrar un rango de páginas centrado en la página actual
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);

  return (
    <div className="pagination-container">
      <button
        className="pagination-button"
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </button>
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {startPage > 1 && (
        <button className="pagination-button" onClick={() => onPageChange(1)}>
          1
        </button>
      )}
      {startPage > 2 && <span className="pagination-ellipsis">...</span>}
      {pages.map((page) => (
        <button
          key={page}
          className={`pagination-button ${page === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
      {endPage < totalPages && (
        <button className="pagination-button" onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </button>
      )}
      <button
        className="pagination-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
      <button
        className="pagination-button"
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
