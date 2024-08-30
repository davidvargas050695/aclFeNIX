import React from "react";
import "./TableModule.css";
import Pagination from "../Table/pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from '@fortawesome/free-solid-svg-icons';

const TableModule = ({
    title, rows = [], columns = [], renderRow, icon, currentPage, totalItems, itemsPerPage,
    onPageChange, onRowClick, selectedRow, onRefresh, onSelectAll, isAllSelected
}) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
        <div className="sales-table-container2">
            <div className="sales-table-header2">
                <div className="header-left2">
                    <div className="icon-container-table2">
                        <FontAwesomeIcon icon={icon} className="icon" />
                    </div>
                    <h3>{title}</h3>
                    <FontAwesomeIcon
                        icon={faSync}
                        className="shortcut-icon-actually"
                        onClick={onRefresh}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                <div className="header-right">
                    <button
                        className="basic-custom-button"
                        onClick={onSelectAll}
                    >
                        {isAllSelected ? 'DESELECCIONAR TODOS' : 'SELECCIONAR TODOS'}
                    </button>
                </div>
            </div>
            <table className="sales-table2">
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
                                onClick={() => onRowClick && onRowClick(item)}
                                className={item === selectedRow ? "selected-row" : ""}
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

export default TableModule;
