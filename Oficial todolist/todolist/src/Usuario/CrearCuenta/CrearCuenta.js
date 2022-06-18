import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import styles from "../IniciarSesion/styles.module.css";
import signup from "../images/signup.jpg"

function Signup() {
    const [usuario, setUsuario] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    var navigate = useNavigate();

    function agregarUsuario() {
        var datos = {
            usuario: usuario,
            email: email,
            password: password,
        };

        axios
            .post("/api/registro", datos)
            .then((res) => {
                Swal.fire({
                    icon: "success",
                    title: "Exito",
                    text: "Te has registrado exitosamente.",
                });
            })
            .then(navigate("/"))
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: error.response.data.Error,
                });
            });
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.heading}>Crear Cuenta</h1>
            <div className={styles.form_container}>
                <div className={styles.left}>
                    <img className={styles.img} src={signup} alt="signup" />
                </div>
                <div className={styles.right}>
                    <h2 className={styles.from_heading}>Crea tu cuenta</h2>
                    <input type="text"
                        className={styles.input}
                        placeholder="Username"
                        value={usuario}
                        onChange={(e) => { setUsuario(e.target.value); }} />
                    <input type="text"
                        className={styles.input}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); }} />
                    <input
                        type="password"
                        className={styles.input}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value); }}
                    />
                    <button className={styles.btn}
                        onClick={agregarUsuario}>
                        Crear Cuenta
                    </button>
                    <p className={styles.text}>o</p>
                    <p className={styles.text}>
                        ¿Ya tienes cuenta? <Link to="/">Iniciar Sesión</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
