import Navbar from "../components/Navbar.tsx";
import {useState} from "react";
import {API_URL} from "../main.tsx";
import {getToken} from "./Home.tsx";

const NuevoEvento = () => {
    const [nombre, setNombre] = useState<string>('');
    const [fecha, setFecha] = useState<string>('');
    const [precio, setPrecio] = useState<number>(0);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const requestBody = {
            nombre: nombre,
            fecha: fecha,
            precio: precio
        };

        try {
            const response = await fetch(`${API_URL}/api/v1/eventos/nuevo-evento`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken(),
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                alert('Evento creado exitosamente!');
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Error al crear el evento');
            }
        } catch (error) {
            alert('Error de conexión. Por favor, intenta más tarde.');
            console.log(error);
        }
    }

    return (
        <div className={"main-container"}>
            <Navbar />
            <div className={"welcome"}>
                <div className={"auth-container"}>
                    <h2>Nuevo evento</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Nombre</span>
                            <input
                                type="text"
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Fecha</span>
                            <input
                                type="date"
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                value={fecha}
                                onChange={(e) => setFecha(e.target.value)}
                                required
                            />
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="inputGroup-sizing-default">Precio</span>
                            <input
                                type="number"
                                className="form-control"
                                aria-label="Sizing example input"
                                aria-describedby="inputGroup-sizing-default"
                                value={precio}
                                onChange={(e) => setPrecio(parseInt(e.target.value))}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Crear evento</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default NuevoEvento;