import React, { useState, useEffect } from 'react';

const ModulesModal = ({ data }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const columns = [
        { title: "descripcion", key: "descripcion" },
        { title: "origen", key: "origen" },
        { title: "codigo", key: "codigo" },
        { title: "Seleccionar", key: "select" }
    ];

    const itemsPerPage = 50;
    const paginatedData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  
    const renderRow = (item, index) => (
      <>
        <td>{item.description}</td>
        <td>{item.origen}</td>
        <td>{item.codigo}</td>
      </>
    );

    return (

        <div className="modal-overlay">
            <h2>Modules</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cod Módulo</th>
                        <th>Descripción</th>
                        <th>Tipo de Contrato</th>
                        <th>Es de Pago</th>
                        <th>Max Count</th>
                        <th>Type</th>
                        <th>Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((modulo) => (
                        <tr key={modulo.id}>
                            <td>{modulo.id}</td>
                            <td>{modulo.codModulo}</td>
                            <td>{modulo.descModulo}</td>
                            <td>{modulo.tipoContra}</td>
                            <td>{modulo.isPay}</td>
                            <td>{modulo.maxCount}</td>
                            <td>{modulo.type}</td>
                            <td>{modulo.description}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ModulesModal;
