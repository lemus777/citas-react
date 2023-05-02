const Error = ({children}) => {
  return (
    <div className="bg-red-500 text-white text-center p-3 uppercase font-bold mb-3 rounded-md">
      {children} {/* Va a usar el children del componente error (ver en Formulario línea 53) */}
    </div>
  )
}

export default Error