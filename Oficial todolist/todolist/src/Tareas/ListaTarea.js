import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TareaIndividual from './TareaIndividual'
import Navbar from '../Nabvar/Navbar'

function ListaTarea() {

    const [dataTareas, setDataTareas] = useState([])

    var identidad = localStorage.getItem("identidad");

    useEffect(() => {
        axios.get('/api/listarTarea/' + identidad).then((res) => {
            console.log(res.data)
            setDataTareas(res.data.Entidades_registradas)
        }).catch((err) => {
            console.error(err)
        })
    }, [identidad])

    const listaTareas = dataTareas.map(tarea => {
        return (
            <div>
                <TareaIndividual tarea={tarea} />
            </div>
        )
    })

    return (
        <>
            <Navbar />
            <div>
                <h2>Tareas</h2>
                {listaTareas}
            </div>
        </>
    )
}

export default ListaTarea