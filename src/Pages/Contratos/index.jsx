import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Contratos.css';
import { Carousel, Products, Searcher } from "../../components";

const Contratos = () => {
    return (
        <Searcher onSearch={handleSearch} />
            <div className="home_table-container">
                <table className="contract_table">
                    <thead className="contract_thead">
                        <tr className="contract__tr">
                            <th className="contract_th">Contrato</th>
                            <th className="contract_th">Cliente</th>
                            <th className="contract_th">Sucursal</th>
                            <th className="contract_th">Identificador</th>
                            <th className="contract_th">Contratos</th>
                            <th className="contract_th">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="contract_tbody">


                    </tbody>
                </table>

            </div>
        
    )

}

export default Contratos;