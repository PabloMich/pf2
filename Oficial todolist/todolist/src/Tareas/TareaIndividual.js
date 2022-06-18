import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Swal from "sweetalert2";

function TareaIndividual({ tarea }) {

    const navegar = useNavigate()

    var identidad = localStorage.getItem("identidad");

    function borrarTarea(id) {
        Swal.fire({
            title: '¿Estás seguro de eliminar esta tarea?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, Eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete('/api/borrarTarea/' + id)
                axios.get('/api/listarTarea/' + identidad)
                    .then(res => {
                        console.log(res.data)
                        navegar(0)
                    }).catch(err => {
                        console.log(err)
                    })
            }
        })
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6 offset-3">
                    <ul className="list-group">
                        <li
                            className="list-group-item">{tarea.nombre}
                        </li>
                        <li
                            className="list-group-item">{tarea.texto}
                        </li>
                    </ul>
                    <div class="form-check">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                        />
                        <label
                            class="form-check-label"
                            for="flexCheckDefault">
                        </label>
                        <Link
                            to={`/editarTarea/${tarea._id}`}>
                            <li
                                className="btn btn-success">Editar
                            </li>
                        </Link>
                        &nbsp;&nbsp;
                        <button
                            className="btn btn-danger"
                            onClick={() => { borrarTarea(tarea._id) }}>Eliminar
                        </button>
                        <hr
                            className="mt-4">
                        </hr>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default TareaIndividual