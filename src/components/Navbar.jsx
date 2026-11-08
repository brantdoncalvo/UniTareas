
function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <a className="navbar-brand fw-bold" href="#">
          UniTareas
        </a>

        <div className="navbar-nav ms-auto">
          <a className="nav-link active" href="#">
            Inicio
          </a>

          <a className="nav-link" href="#actividades">
            Mis actividades
          </a>

          <a className="nav-link" href="#asistente">
            Asistente inteligente
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
