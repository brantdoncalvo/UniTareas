
import './App.css'

function App() {
  return (
    <>
      <header className="bg-primary text-white p-3">
        <div className="container">
          <h1 className="h3 mb-0">UniTareas</h1>
          <p className="mb-0">
            Organiza tus actividades académicas
          </p>
        </div>
      </header>

      <main className="container py-4">

        <section className="mb-4">
          <h2 className="h3">Mi panel principal</h2>
          <p className="text-secondary">
            Aquí puedes consultar y organizar tus actividades.
          </p>
        </section>

        <section className="row g-3 mb-4">

          <article className="col-12 col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="h5">Tareas pendientes</h3>
                <p className="display-6 text-primary mb-0">0</p>
              </div>
            </div>
          </article>

          <article className="col-12 col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="h5">Tareas completadas</h3>
                <p className="display-6 text-success mb-0">0</p>
              </div>
            </div>
          </article>

          <article className="col-12 col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="h5">Próximas entregas</h3>
                <p className="display-6 text-warning mb-0">0</p>
              </div>
            </div>
          </article>

        </section>

        <section className="card shadow-sm mb-4">
          <div className="card-body">
            <h2 className="h4">Mis actividades</h2>
            <p className="text-secondary">
              Aquí aparecerán las tareas que registres.
            </p>

            <button
              className="btn btn-primary"
              onClick={() => alert('¡Próximamente podrás agregar tus tareas!')}
            >
              Agregar tarea
            </button>
          </div>
        </section>

        <section className="card shadow-sm">
          <div className="card-body">
            <h2 className="h4">Asistente inteligente</h2>
            <p className="text-secondary mb-0">
              Próximamente recibirás recomendaciones para
              organizar mejor tus actividades académicas.
            </p>
          </div>
        </section>

      </main>

      <footer className="bg-light text-center p-3 mt-4">
        <p className="mb-0 text-secondary">
          UniTareas - Organiza tus actividades académicas.
        </p>
      </footer>
    </>
  )
}

export default App
