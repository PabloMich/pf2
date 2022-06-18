import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../IniciarSesion/styles.module.css";
import login from "../images/login.jpg"
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {

    localStorage.clear();
    const navigate = useNavigate();
    const [datos, setDatos] = useState({ email: "", password: "" });

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        let newDatos = { ...datos, [name]: value };
        setDatos(newDatos);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios
            .post("/api/login", datos)
            .then((res) => {
                localStorage.setItem("identidad", res.data.Inicio_exitoso._id);

                var identidad = localStorage.getItem("identidad");

                navigate("/tareas/" + identidad);
            })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: error.response.data.Error,
                });
                console.log(error);
            });
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <h1 className={styles.heading}>Iniciar Sesión</h1>
                <div className={styles.form_container}>
                    <div className={styles.left}>
                        <img
                            className={styles.img}
                            src={login}
                            alt="login"
                        />
                    </div>
                    <div className={styles.right}>
                        <h2 className={styles.from_heading}>Ingrese sus datos</h2>

                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Email"
                            onChange={handleInputChange}
                            value={datos.email}
                            name="email"
                            required
                        />
                        <input
                            type="password"
                            className={styles.input}
                            placeholder="Password"
                            onChange={handleInputChange}
                            value={datos.password}
                            name="password"
                            required
                        />

                        <button
                            className={styles.btn}>
                            Iniciar Sesión
                        </button>
                        <p className={styles.text}>o</p>
                        <p className={styles.text}>
                            ¿No tienes cuenta? <Link
                                to="/crearCuenta">
                                Crea una
                            </Link>
                        </p>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default Login;
