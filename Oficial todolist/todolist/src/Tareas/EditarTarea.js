import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Nabvar/Navbar'
import Swal from "sweetalert2";

function EditarTarea() {

    const params = useParams()
    const navigate = useNavigate()

    const [nombre, setNombre] = useState('')
    const [texto, setTexto] = useState('')

    useEffect(() => {
        axios.get(`/api/tareaPorId/${params.id}`).then((res) => {
            console.log(res.data)
            setNombre(res.data.Tarea_Encontrada.nombre);
            setTexto(res.data.Tarea_Encontrada.texto);
        }).catch((err) => {
            console.log(err);
        });
    }, [params.id]);

    var id = localStorage.getItem("identidad");

    function editarTarea() {
        const actualizarTarea = {
            nombre: nombre,
            texto: texto
        }

        axios.put(`/api/editarTarea/${params.id}`, actualizarTarea)
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "Exito",
                    text: "Tarea modificada con exito",
                    timer: 1500,
                });
                navigate('/tareas/' + id)
            })
            .catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: err.response.data.Error,
                });
            });
    }

    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row">
                    <h2 className="mt-4">Editar Tarea</h2>
                </div>

                <div className="row">
                    <div className="col-sm-6 offset-3">
                        <div className="mb-3">
                            <label htmlFor="nombre" className="form-label">Nombre</label>
                            <input type="text" className="form-control" value={nombre} onChange={(e) => { setNombre(e.target.value); }}></input>
                            <label htmlFor="texto" className="form-label">Texto</label>
                            <input type="text" className="form-control" value={texto} onChange={(e) => { setTexto(e.target.value); }}></input>
                        </div>
                        <button onClick={editarTarea} className="btn btn-success">Guardar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditarTarea