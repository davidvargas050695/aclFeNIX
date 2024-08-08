import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Home.css';

const Home = () => {
    const [table1Data, setTableData] = useState([
        { contrato: '001', cliente: 'Juan Pérez', sucursal: 'Sucursal A', identificador: '123456' },
        { contrato: '002', cliente: 'María García', sucursal: 'Sucursal B', identificador: '789012' }
    ]);
    const data = [
        {
            codigo: '001',
            descripcion: 'Descripción 1',
            origen: 'Origen 1',
            factura: 'Factura 1',
            valor: '$100',
            estado: 'Activo',
            lic: 'Licencia 1',
            caduca: '2024-12-31',
            motivo: 'Motivo 1',
            usuario: 'Usuario 1',
            paga: 'Sí',
            trans: '12345',
            consReal: '56789'
        },
        {
            codigo: '002',
            descripcion: 'Descripción 2',
            origen: 'Origen 2',
            factura: 'Factura 2',
            valor: '$200',
            estado: 'Inactivo',
            lic: 'Licencia 2',
            caduca: '2024-11-30',
            motivo: 'Motivo 2',
            usuario: 'Usuario 2',
            paga: 'No',
            trans: '67890',
            consReal: '98765'
        },

    ];

    const [servers, setServers] = useState(0);
    const [clients, setClients] = useState(0);

    const [isChecked, setIsChecked] = useState(false);
    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const [startDate, setStartDate] = useState(new Date());



    return (
        <div className="home_container">
            <div className="home_header">
                <div className="header_table-container">
                    <h1 className="title">CONTRATOS</h1>
                    <hr className="line" />
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Contrato</th>
                                    <th>Cliente</th>
                                    <th>Sucursal</th>
                                    <th>Identificador</th>
                                </tr>
                            </thead>
                            <tbody>
                                {table1Data.map((row, index) => (
                                    <tr key={index}>
                                        <td>{row.contrato}</td>
                                        <td>{row.cliente}</td>
                                        <td>{row.sucursal}</td>
                                        <td>{row.identificador}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="info-column">
                    <div className="header_info-container">
                        <div className="data1_info-contianer">
                            <div className="data1_info">
                                <p className="counter_title">Nro.Contrato</p>
                                <input className="home_text-box" />
                            </div>
                            <div className="data1_info">
                                <p className="counter_title">Nro.Identificador</p>
                                <input className="home_text-box" />
                            </div>
                            <div className="data1_info">
                                <div className="counter1_box">
                                    <p className="counter_title">Cliente</p>
                                    <select className="combo_box">
                                        <option value="cliente"></option>
                                        <option value="cliente1">Cliente 1</option>
                                        <option value="cliente2">Cliente 2</option>
                                        <option value="cliente3">Cliente 3</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <hr className="line2" />
                        <div className="data1_info-contianer">
                            <div className="data1_info">
                                <p className="counter_title">Sucursal</p>
                                <input className="home_text-box" />
                            </div>
                            <div className="data1_info">
                                <p className="counter_title">Servidor</p>
                                <input className="home_text-box" />
                            </div>
                            <div className="data1_info">
                                <p className="counter_title">Caduca</p>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    showTimeSelect
                                    dateFormat="Pp"
                                    className="home_text-box"
                                />
                            </div>
                            <div className="data1_info small-data1_info">
                                <p className="counter_title inline">Actualizar</p>
                                <div className="checkbox-container">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={isChecked}
                                            onChange={handleCheckboxChange}
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <hr className="line2" />
                        <div className="data1_info-contianer">
                            <div className="data1_info">
                                <p className="counter_title">Producto</p>
                                <select className="combo_box">
                                    <option value="producto"></option>
                                    <option value="producto1">Producto 1</option>
                                    <option value="producto2">Producto 2</option>
                                    <option value="producto3">Producto 3</option>
                                </select>
                            </div>
                            <div className="data1_info">
                                <p className="counter_title">Tipo Contrato</p>
                                <select className="combo_box">
                                    <option value="contrato"></option>
                                    <option value="contrato1">Contrato 1</option>
                                    <option value="contrato2">Contrato 2</option>
                                    <option value="contrato3">Contrato 3</option>
                                </select>
                            </div>
                            <div className="data1_info">
                                <p className="counter_title">Bloqueo</p>
                                <input className="home_text-box" />
                            </div>
                        </div>
                        <hr className="line2" />
                        <div className="data1_container">
                            <div className="data1_count">
                                <h3 className="module_title">Módulo Comercial</h3>
                                <div className="counters_container">
                                    <div className="counter">
                                        <p className="counter2_title">Servidores</p>
                                        <div className="counter_box">
                                            <button onClick={() => setServers(servers - 1)} className="counter_button">-</button>
                                            <input type="text" value={servers} readOnly className="counter_input" />
                                            <button onClick={() => setServers(servers + 1)} className="counter_button">+</button>
                                        </div>
                                    </div>
                                    <div className="counter">
                                        <p className="counter2_title">Clientes</p>
                                        <div className="counter_box">
                                            <button onClick={() => setClients(clients - 1)} className="counter_button">-</button>
                                            <input type="text" value={clients} readOnly className="counter_input" />
                                            <button onClick={() => setClients(clients + 1)} className="counter_button">+</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="header_info2-container">
                        <div className="data2_colum">
                            <h3 className="data1_title">Datos Implementación:</h3>
                            <div className="data_info_container">
                                <p className="data_info">Instalador:</p>
                                <select className="combo_box">
                                    <option value="option1"></option>
                                    <option value="option1">Opción 1</option>
                                    <option value="option2">Opción 2</option>
                                    <option value="option3">Opción 3</option>
                                </select>
                            </div>
                            <div className="data_info_container">
                                <p className="data_info">Implement:</p>
                                <select className="combo_box">
                                    <option value="option1"></option>
                                    <option value="option1">Opción 1</option>
                                    <option value="option2">Opción 2</option>
                                    <option value="option3">Opción 3</option>
                                </select>
                            </div>
                            <div className="data_info_container">
                                <p className="data_info">Estado:</p>
                                <select className="combo_box">
                                    <option value="option1"></option>
                                    <option value="option1">Opción 1</option>
                                    <option value="option2">Opción 2</option>
                                    <option value="option3">Opción 3</option>
                                </select>
                            </div>
                        </div>
                        <div className="data2_colum">
                            <h3 className="data1_title">Datos Fecha:</h3>
                            <div className="data_info_container">
                                <p className="data_info">Instalación:</p>
                                <input className="home_text-box" />

                            </div>
                            <div className="data_info_container">
                                <p className="data_info">Cambios:</p>
                                <input className="home_text-box" />

                            </div>
                            <div className="data_info_container">
                                <p className="data_info">Finalización:</p>
                                <input className="home_text-box" />

                            </div>
                        </div>
                        <div className="data2_colum">
                            <h3 className="data1_title">Observación:</h3>
                            <input className="home_text2-box" />
                        </div>
                    </div>

                </div>
            </div>
            <div className="table2_container">

                <h1 className="title">MODULOS</h1>
                <hr className="line" />

                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Código</th>
                                <th>Descripción</th>
                                <th>Origen</th>
                                <th>Factura</th>
                                <th>Valor</th>
                                <th>Estado</th>
                                <th>#Lic</th>
                                <th>Caduca</th>
                                <th>Motivo</th>
                                <th>Usuario</th>
                                <th>Paga</th>
                                <th>#TRansc</th>
                                <th>Cons.Real</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.codigo}</td>
                                    <td>{item.descripcion}</td>
                                    <td>{item.origen}</td>
                                    <td>{item.factura}</td>
                                    <td>{item.valor}</td>
                                    <td>{item.estado}</td>
                                    <td>{item.lic}</td>
                                    <td>{item.caduca}</td>
                                    <td>{item.motivo}</td>
                                    <td>{item.usuario}</td>
                                    <td>{item.paga}</td>
                                    <td>{item.trans}</td>
                                    <td>{item.consReal}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>

                </div>


            </div>
        </div>
    );
};

export default Home;
