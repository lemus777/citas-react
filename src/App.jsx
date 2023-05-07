import { useState, useEffect } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListadoPacientes from "./components/ListadoPacientes"


function App() {
  const [pacientes, setPacientes] = useState([])
  const [paciente, setPaciente] = useState({})

  // usamos useEffect para evitar cambiar pacientes a un array vacío al recargar si ya tenemos pacientes almacenados
  useEffect(() => {
    // esta funcion obtiene los pacientes guardados en local storage y si no hay nada coloca un arreglo vacio
    const obtenerLS = () => {
      // como LS trabaja con strings, tenemos que pasarlo a JSON con parse para poder usarlo en nuestro código
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) && []
      /*pacientesLS?.length > 0 &&*/ setPacientes(pacientesLS);
      // sustituimos nuestro array inicial de estado con lo almacenado. Esto pasa antes del siguiente useEffect,
      // por lo que incluso si recargamos cuando sustituya los pacientes ya no es el array vacío sino lo almacenado
    }
    obtenerLS()
  }, []) // no le pasamos dependencia porque queremos que se ejecute una sola vez

  // usamos useEffect para almacenar los pacientes en localStorage cada vez que cambia pacientes
  useEffect(() => {
    // localStorage trabaja con strings, así que tenemos que usar JSON.stringify en pacientes para poder guardarlos
    localStorage.setItem('pacientes', JSON.stringify( pacientes ))
  }, [pacientes])

  const eliminarPaciente = id => { // esto es una función flecha, pero como sólo tenemos un parámetro podemos quitar el paréntesis
    // tomamos la id, y filtramos pacientes para quedarnos sólo con los que no tengan la id del que queremos borrar
    const pacientesActualizados = pacientes.filter( paciente => paciente.id !== id)
    // usamos esos pacientes filtrados para el estado de los pacientes
    setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mx-auto mt-20">
      <Header />
      <div className="mt-12 md:flex">
        <Formulario 
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListadoPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  )
}

export default App
