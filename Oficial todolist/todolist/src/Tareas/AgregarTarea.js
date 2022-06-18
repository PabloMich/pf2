import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from '../Nabvar/Navbar'
import axios from 'axios';
import Swal from "sweetalert2";

function AgregarTarea() {
    //Hooks
    const [nombre, setNombre] = useState('')
    const [texto, setTexto] = useState('')

    const navigate = useNavigate()
    var id = localStorage.getItem("identidad");

    function agregarTarea() {
        var tarea = {
            nombre: nombre,
            texto: texto,
        }

        axios.post('/api/tarea/' + id, tarea)
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "Éxito",
                    text: "Tarea agregada correctamente",
                    timer: 2000
                });
                navigate("/tareas/" + id)
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: err.response.data.Error,
                    timer: 2000
                });
            })
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">
                    <h2
                        className="mt-4">Crear nueva tarea
                    </h2>
                </div>
                <div className="row">
                    <div className="col-sm-6 offset-3">
                        <div className="mb-3">
                            <label
                                htmlFor="nombre"
                                className="form-label">Nombre de la tarea
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={nombre}
                                onChange={(e) => { setNombre(e.target.value); }}>
                            </input>
                            <label
                                htmlFor="texto"
                                className="form-label">Texto
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={texto}
                                onChange={(e) => { setTexto(e.target.value); }}>
                            </input>
                        </div>
                        <button
                            onClick={agregarTarea}
                            className="btn btn-success">Guardar
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AgregarTarea