import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ListaTarea from './Tareas/ListaTarea'
import AgregarTarea from './Tareas/AgregarTarea'
import EditarTarea from './Tareas/EditarTarea'
import IniciarSesion from './Usuario/IniciarSesion/IniciarSesion'
import CrearCuenta from './Usuario/CrearCuenta/CrearCuenta'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<IniciarSesion />} exact></Route>
        <Route path='/crearCuenta' element={<CrearCuenta />} exact></Route>
        <Route path='/tareas/:ID' element={<ListaTarea />} exact></Route>
        <Route path='/agregarTarea/:ID' element={<AgregarTarea />} exact></Route>
        <Route path='/editarTarea/:id' element={<EditarTarea />} exact></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
