
import { useState } from 'react'

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [priority, setPriority] = useState('Media')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    if (!title.trim() || !subject.trim() || !dueDate) {
      setError('Por favor, completa todos los campos.')
      return
    }

    if (dueDate < new Date().toLocaleDateString('en-CA')) {
      setError('La fecha de entrega no puede estar en el pasado.')
      return
    }

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      subject: subject.trim(),
      dueDate,
      priority,
      completed: false,
    }

    onAddTask(newTask)

    setTitle('')
    setSubject('')
    setDueDate('')
    setPriority('Media')
    setError('')
  }

  return (
    <section className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="h4 mb-3">Registrar nueva tarea</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre de la tarea</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Ej. Trabajo de matemáticas"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Asignatura</label>
            <input
              type="text"
              className="form-control"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
              placeholder="Ej. Matemáticas"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Fecha de entrega</label>
            <input
              type="date"
              className="form-control"
              value={dueDate}
              min={new Date().toLocaleDateString('en-CA')}
              onChange={(event) => setDueDate(event.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Prioridad</label>
            <select
              className="form-select"
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Guardar tarea
          </button>
        </form>
      </div>
    </section>
  )
}

export default TaskForm
