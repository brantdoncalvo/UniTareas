
function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  if (tasks.length === 0) {
    return (
      <section id="actividades" className="card shadow-sm mb-4">
        <div className="card-body">
          <h2 className="h4">Mis actividades</h2>
          <p className="text-secondary mb-0">
            Todavía no tienes tareas registradas.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section id="actividades" className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="h4 mb-3">Mis actividades</h2>

        <div className="list-group">
          {tasks.map((task) => (
            <article
              key={task.id}
              className="list-group-item p-3"
            >
              <div className="d-flex justify-content-between align-items-start flex-wrap gap-2">
                <div>
                  <h3 className="h5 mb-1">
                    {task.title}
                  </h3>

                  <p className="text-secondary mb-1">
                    Asignatura: {task.subject}
                  </p>

                  <p className="mb-1">
                    Entrega: {task.dueDate}
                  </p>

                  <span className="badge bg-info text-dark">
                    Prioridad: {task.priority}
                  </span>

                  <span className={`badge ms-2 ${task.completed ? 'bg-success' : 'bg-warning text-dark'}`}>
                    {task.completed ? 'Completada' : 'Pendiente'}
                  </span>
                </div>

                <div className="d-flex gap-2">
                  <button
                    className={`btn btn-sm ${task.completed ? 'btn-secondary' : 'btn-success'}`}
                    onClick={() => onToggleTask(task.id)}
                  >
                    {task.completed ? 'Reabrir' : 'Completar'}
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onDeleteTask(task.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TaskList
