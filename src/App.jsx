
import './App.css'

function App() {
  return (
    <div className="container py-5">
      <header className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">
          UniTareas
        </h1>
        <p className="lead text-secondary">
          Organiza tus actividades académicas y alcanza tus metas.
        </p>
      </header>

      <main className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow border-0">
            <div className="card-body p-4 text-center">
              <h2 className="h4 mb-3">
                ¡Bienvenido a UniTareas!
              </h2>

              <p className="text-secondary">
                Administra tus tareas, organiza tus fechas de entrega
                y mejora tu planificación académica.
              </p>

              <button className="btn btn-primary btn-lg w-100">
                Comenzar
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App

