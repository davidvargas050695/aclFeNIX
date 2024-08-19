import React, { useState } from 'react';
import Header from '../../components/Header';
import './UserForm.css';

const UserForm = ({ handleLogout }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        diaNacimiento: '',
        mesNacimiento: '',
        anoNacimiento: '',
        email: '',
        dni: '',
        celular: '',
        provincia: '',
        ciudad: '',
        direccion: ''
    });


    const handleCancel = () => {
        setFormData(formData);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos del formulario:', formData);
    };

    // Listas para los select
    const dias = Array.from({ length: 31 }, (_, i) => i + 1);
    const meses = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
    const anos = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

    const provincias = [
        'Azuay', 'Bolívar', 'Cañar', 'Carchi', 'Chimborazo', 'Cotopaxi', 'El Oro', 'Esmeraldas', 'Galápagos', 'Guayas',
        'Imbabura', 'Loja', 'Los Ríos', 'Manabí', 'Morona Santiago', 'Napo', 'Orellana', 'Pastaza', 'Pichincha', 'Santa Elena',
        'Santo Domingo de los Tsáchilas', 'Sucumbíos', 'Tungurahua', 'Zamora-Chinchipe'
    ];

    const ciudades = {
        'Azuay': ['Cuenca', 'Gualaceo', 'Sigsig'],
        'Bolívar': ['Guaranda', 'San Miguel', 'Chillanes'],
        'Cañar': ['Azogues', 'Biblian', 'La Troncal'],
        'Carchi': ['Tulcán', 'Montúfar', 'San Gabriel'],
        'Chimborazo': ['Riobamba', 'Guano', 'Alausí'],
        'Cotopaxi': ['Latacunga', 'Salcedo', 'La Maná'],
        'El Oro': ['Machala', 'Pasaje', 'Santa Rosa'],
        'Esmeraldas': ['Esmeraldas', 'Atacames', 'Quinindé'],
        'Galápagos': ['Puerto Ayora', 'Puerto Baquerizo Moreno', 'Puerto Villamil'],
        'Guayas': ['Guayaquil', 'Daule', 'Milagro'],
        'Imbabura': ['Ibarra', 'Otavalo', 'Cotacachi'],
        'Loja': ['Loja', 'Catamayo', 'Macará'],
        'Los Ríos': ['Babahoyo', 'Quevedo', 'Vinces'],
        'Manabí': ['Portoviejo', 'Manta', 'Chone'],
        'Morona Santiago': ['Macas', 'Sucúa', 'Gualaquiza'],
        'Napo': ['Tena', 'Archidona', 'El Chaco'],
        'Orellana': ['Francisco de Orellana', 'Loreto', 'La Joya de los Sachas'],
        'Pastaza': ['Puyo', 'Mera', 'Santa Clara'],
        'Pichincha': ['Quito', 'Cayambe', 'Rumiñahui'],
        'Santa Elena': ['Santa Elena', 'La Libertad', 'Salinas'],
        'Santo Domingo de los Tsáchilas': ['Santo Domingo'],
        'Sucumbíos': ['Lago Agrio', 'Shushufindi', 'Cascales'],
        'Tungurahua': ['Ambato', 'Baños', 'Pelileo'],
        'Zamora-Chinchipe': ['Zamora', 'Yantzaza', 'El Pangui']
    };


    return (
        <div className="home-container">
            <Header onLogout={handleLogout} title='Nuevo Cliente' />
            <div className="formu-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-nameInfo">
                        <div className="form-name">
                            <div className="label-form">
                                <label >Nombre</label>
                            </div>
                            <div className="imput">
                                <input
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="form-lastname">
                            <div className="label-form">
                                <label >Apellido</label>
                            </div>
                            <div className="imput">
                                <input
                                    type="text"
                                    name="apellido"
                                    value={formData.apellido}
                                    onChange={handleChange}
                                    required
                                />

                            </div>
                        </div>

                    </div>
                    <div className="form-birthday">
                        <div className="label-form">
                            <label >Fecha de Nacimiento</label>
                        </div>
                        <div className="birthday-date">
                            <select
                                name="diaNacimiento"
                                value={formData.diaNacimiento}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Día</option>
                                {dias.map(dia => (
                                    <option key={dia} value={dia}>{dia}</option>
                                ))}
                            </select>
                            <select
                                name="mesNacimiento"
                                value={formData.mesNacimiento}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Mes</option>
                                {meses.map((mes, index) => (
                                    <option key={index} value={index + 1}>{mes}</option>
                                ))}
                            </select>
                            <select
                                name="anoNacimiento"
                                value={formData.anoNacimiento}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Año</option>
                                {anos.map(ano => (
                                    <option key={ano} value={ano}>{ano}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-contact">
                        <div className="form-dni">
                            <div className="label-form">
                                <label >Cédula/RUC</label>
                            </div>
                            <div className="imput">
                                <input
                                    type="text"
                                    name="dni"
                                    value={formData.dni}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>
                        <div className="form-email">
                            <div className="label-form">
                                <label >Email</label>
                            </div>
                            <div className="imput">
                                <input
                                    className="imput-form"
                                    type="email"
                                    name="email"
                                    value={formData.confirmEmail}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>
                        <div className="form-phone">
                            <div className="label-form">
                                <label >Número de Celular</label>
                            </div>
                            <div className="imput">
                                <input
                                    className="imput-form"
                                    type="tel"
                                    name="celular"
                                    pattern="[0-9]*"
                                    value={formData.celular}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                        </div>
                    </div>
                    <div className="form-address">
                        <div className="form-province">
                            <div className="label-form">
                                <label >Provincia</label>
                            </div>
                            <select
                                name="provincia"
                                value={formData.provincia}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Selecciona una provincia</option>
                                {provincias.map(provincia => (
                                    <option key={provincia} value={provincia}>{provincia}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-city">
                            <div className="label-form">
                                <label >Ciudad</label>
                            </div>
                            <select
                                name="ciudad"
                                value={formData.ciudad}
                                onChange={handleChange}
                                required
                                disabled={!formData.provincia}
                            >
                                <option value="">Selecciona una ciudad</option>
                                {formData.provincia && ciudades[formData.provincia].map(ciudad => (
                                    <option key={ciudad} value={ciudad}>{ciudad}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-addresses">
                            <div className="label-form">
                                <label >Dirección</label>
                            </div>
                            <input
                                className="imput-form"
                                type="text"
                                name="direccion"
                                value={formData.direccion}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div className="acctions">
                        <button type="button" onClick={handleCancel}>Cancelar</button>
                        <button type="submit">Guardar</button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default UserForm;
