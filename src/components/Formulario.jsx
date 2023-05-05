import { useState, useEffect } from "react"
import Error from "./Error"

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {
  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')

  const [error, setError] = useState(false)

  /* useEffect evita renders innecesarios, renderizando sólo cuando cambia la dependencia que le pasamos en el array final 
  Si no pasamos nada en el array, sólo se renderizará una vez al cargar */
  useEffect(() => {
    if ( Object.keys(paciente).length > 0 ) {
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    } 
  }, [paciente])

  

  const generarId = () => {
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)
    return random + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validación del formulario
    if( [ nombre, propietario, email, fecha, sintomas ].includes('') ) { // esto comprueba si alguno de los estados es un string vacío
      console.log('Hay al menos un campo vacío')
      setError(true)
      return // si entra en este condicional pasa error a true y el return hace que deje de ejecutarse el resto de la función handleSubmit
    }

    setError(false) // en el caso de que no falte nada, el error pasa a false, por si antes nos faltó algún campo y se puso en true

    // generaremos un objeto de paciente con todos los datos que tenemos
    const objetoPaciente = {
      nombre, // como los valores van a ser iguales a la key no hay que declararlos
      propietario,
      email,
      fecha,
      sintomas,
      id: generarId()
    }

    if (paciente.id) {
      // Editando el registro. En el caso de que tengamos paciente con id es que lo hemos agregado con el botón editar
      objetoPaciente.id = paciente.id // tomamos la id del paciente que estamos editando
      // iteramos por cada pacienteState en pacientes, si la id coincide con el que editamos sustituimos por el que hemos editado, si no lo dejamos tal cual
      const pacientesActualizados = pacientes.map( pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState )
      // sustituimos los pacientes con el nuevo array de pacientes actualizados
      setPacientes(pacientesActualizados)
      // Una vez editado eliminamos el paciente sustituyéndolo por un objeto vacío
      setPaciente({})
    } else {
      // Nuevo registro
      objetoPaciente.id = generarId()
      /* No debemos modificar el pacientes original, así que lo que hacemos es crear un arreglo nuevo
      Para ello en setPacientes usamos una copia del arreglo original creándolo del siguiente modo -> [...pacientes] 
      A ese arreglo copiado, que es uno nuevo, le agregamos el objetoPaciente -> [... pacientes, objetoPaciente]
      Y este nuevo arreglo lo establecemos como pacientes gracias a la función setPacientes del estado */
      setPacientes([...pacientes, objetoPaciente])
    }
    
    // Reiniciar el formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">Añade Pacientes y <span className="text-indigo-600 font-bold">Adminístralos</span></p>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5">
        { error && <Error><p>Todos los campos son obligatorios</p></Error>} {/* para pasar un prop como children lo hacemos con esta sintaxis */}
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
          <input
            id="mascota"
            type='text'
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={ e => setNombre(e.target.value) }
          />
        </div>
        <div className="mb-5">
          <label htmlFor="propietario" className="block text-gray-700 uppercase font-bold">Nombre Propietario</label>
          <input
            id="propietario"
            type='text'
            placeholder="Nombre del propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={ e => setPropietario(e.target.value) }
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
          <input
            id="email"
            type='email'
            placeholder="Email Contacto Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={ e => setEmail(e.target.value) }
          />
        </div>
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Alta</label>
          <input
            id="alta"
            type='date'
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={ e => setFecha(e.target.value) }
          />
        </div>
        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Síntomas</label>
          <textarea 
            id="sintomas"
            placeholder="Describe los síntomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={ e => setSintomas(e.target.value) }
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors rounded-lg"
          value={ paciente.id ? 'Editar paciente' : 'Agregar paciente'} /* si paciente tiene id quiere decir que lo hemos traído con el botón editar
          entonces en ese caso mostramos editar paciente. Si no tiene id quiere decir que el objeto paciente aún no ha sido creado */
        />
      </form>
    </div>
  )
}

// htmlFor en el label nos sirve para vincular esa etiqueta con el input que lleve la misma id

export default Formulario