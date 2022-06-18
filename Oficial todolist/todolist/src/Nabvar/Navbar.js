import '../App.css';
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function Navbar() {

    const params = useParams()

    const [usuario, setUsuario] = useState('')

    useEffect(() => {
        axios.get(`/api/listarUsuario/${params.ID}`).then((res) => {
            console.log(res.data)
            setUsuario(res.data.Tarea_Encontrada.usuario);
        }).catch((err) => {
            console.log(err);
        });
    })

    return (
        <div className="App">
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/tareas/:ID">TODO LIST</a>
                    <button
                        type="button"
                        class="navbar-toggler start-1 collapsed"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbar-submenu"
                        aria-expanded="false">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbar">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    aria-current="page"
                                    href="/tareas/:ID">Tareas
                                </a>
                            </li>
                            <li className="nav-item">
                                <Link
                                    className="nav-link"
                                    to="/agregarTarea/:ID">Agregar Tarea
                                </Link>
                            </li>
                        </ul>
                        <span class="navbar-text">Hola, {usuario}
                            <a
                                className="nav-link"
                                aria-current="page"
                                href="/">Cerrar Sesión
                            </a>
                        </span>

                    </div>
                </div>
            </nav>

        </div>
    );
}

export default Navbar;