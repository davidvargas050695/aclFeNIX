import React, { useState } from 'react';
import Header from '../../components/Header';

const UserForm = () => {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        diaNacimiento: '',
        mesNacimiento: '',
        anoNacimiento: '',
        email: '',
        confirmEmail: '',
        celular: '',
        provincia: '',
        ciudad: '',
        direccion: ''
    });

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

    const provincias = ['Azuay', 'Bolivar', 'Cañar', 'Carchi', 'Chimborazo', 'Cotopaxi', 'El Oro', 'Esmeraldas', 'Galápagos', 'Guayas', 'Imbabura', 'Loja', 'Los Ríos', 'Manabi', 'Morona Santiago', 'Napo', 'Orellana', 'Pastaza', 'Pichincha', 'Santa Elena', 'Santo Domingo de los Tsáchilas', 'Sucumbíos', 'Tungurahua', 'Zamora Chinchipe'];
    const ciudades = {
        Azuay: ['Cuenca', 'Gualaceo', 'Sigsig'],
        Bolivar: ['Guaranda', 'San Miguel', 'Chillanes'],
        Cañar: ['Azogues', 'Biblian', 'La Troncal'],
        Carchi: ['Tulcan', 'Montufar', 'San Gabriel'],
        Chimborazo: ['Riobamba', 'Guano', 'Alausi'],
        Cotopaxi: ['Latacunga', 'Salcedo', 'La Maná'],
        ElOro: ['Machala', 'Pasaje', 'Santa Rosa'],
        Esmeraldas: ['Esmeraldas', 'Atacames', 'Quinindé'],
        Galápagos: ['Puerto Ayora', 'Puerto Baquerizo Moreno', 'Puerto Villamil'],
        Guayas: ['Guayaquil', 'Daule', 'Milagro'],
        Imbabura: ['Ibarra', 'Otavalo', 'Cotacachi'],
        Loja: ['Loja', 'Catamayo', 'Macará'],
        LosRíos: ['Babahoyo', 'Quevedo', 'Vinces'],
        Manabi: ['Portoviejo', 'Manta', 'Chone'],
        MoronaSantiago: ['Macas', 'Sucúa', 'Gualaquiza'],
        Napo: ['Tena', 'Archidona', 'El Chaco'],
        Orellana: ['Francisco de Orellana', 'Loreto', 'La Joya de los Sachas'],
        Pastaza: ['Puyo', 'Mera', 'Santa Clara'],
        Pichincha: ['Quito', 'Cayambe', 'Rumiñahui'],
        SantaElena: ['Santa Elena', 'La Libertad', 'Salinas'],
        SantoDomingoDeLosTsáchilas: ['Santo Domingo'],
        Sucumbíos: ['Lago Agrio', 'Shushufindi', 'Cascales'],
        Tungurahua: ['Ambato', 'Baños', 'Pelileo'],
        ZamoraChinchipe: ['Zamora', 'Yantzaza', 'El Pangui']
    };

    return (

        <div className="userform-container">
            {/* Renderiza el Header */}
            <Header />

            <div className="formu-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-label">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-label">
                        <label>Apellido:</label>
                        <input
                            type="text"
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-label">
                        <label>Fecha de Nacimiento:</label>
                        <div>
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
                    <div className="form-label">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-label">
                        <label>Confirmación de Email:</label>
                        <input
                            type="email"
                            name="confirmEmail"
                            value={formData.confirmEmail}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-label">
                        <label>Número de Celular (Ecuador):</label>
                        <input
                            type="tel"
                            name="celular"
                            pattern="[0-9]*"
                            value={formData.celular}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-label">
                        <label>Provincia:</label>
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
                    <div className="form-label">
                        <label>Ciudad:</label>import React, {useState} from 'react';
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
                    <div className="form-label">
                        <label>Dirección:</label>
                        <input
                            type="text"
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Enviar</button>
                </form>

            </div>

        </div>

    );
};

export default UserForm;
