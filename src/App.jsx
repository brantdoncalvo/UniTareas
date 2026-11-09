
import { useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Feedback from './components/Feedback'
import HolidayList from './components/HolidayList'

function App() {
  const [tasks, setTasks] = useState([])
  const [feedback, setFeedback] = useState({
    message: '',
    type: 'success',
  })

  function handleAddTask(newTask) {
    setTasks((previousTasks) => [...previousTasks, newTask])

    setFeedback({
      message: '¡La tarea se registró correctamente!',
      type: 'success',
    })
  }

  function handleToggleTask(id) {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    )

    setFeedback({
      message: 'El estado de la tarea se actualizó.',
      type: 'info',
    })
  }

  function handleDeleteTask(id) {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    )

    setFeedback({
      message: 'La tarea se eliminó correctamente.',
      type: 'warning',
    })
  }

  const pendingTasks = tasks.filter((task) => !task.completed).length
  const completedTasks = tasks.filter((task) => task.completed).length

  return (
    <>
      <Navbar />

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
                <p className="display-6 text-primary mb-0">
                  {pendingTasks}
                </p>
              </div>
            </div>
          </article>

          <article className="col-12 col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="h5">Tareas completadas</h3>
                <p className="display-6 text-success mb-0">
                  {completedTasks}
                </p>
              </div>
            </div>
          </article>

          <article className="col-12 col-md-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3 className="h5">Total de tareas</h3>
                <p className="display-6 text-warning mb-0">
                  {tasks.length}
                </p>
              </div>
            </div>
          </article>

        </section>

        <Feedback
          message={feedback.message}
          type={feedback.type}
          onClose={() => setFeedback({ message: '', type: 'success' })}
        />

        <TaskForm onAddTask={handleAddTask} />

        <TaskList
          tasks={tasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
        />

        <HolidayList />

        <section id="asistente" className="card shadow-sm">
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
