
import { useEffect, useState } from 'react'
import './App.css'

import Navbar from './components/Navbar'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import Feedback from './components/Feedback'
import HolidayList from './components/HolidayList'
import Assistant from './components/Assistant'

import { auth, db } from './firebase'

import {
  onAuthStateChanged,
  signInAnonymously,
} from 'firebase/auth'

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

function App() {
  const [tasks, setTasks] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  const [feedback, setFeedback] = useState({
    message: '',
    type: 'success',
  })

  // Iniciar sesión automáticamente con Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      try {
        if (currentUser) {
          setUser(currentUser)
        } else {
          await signInAnonymously(auth)
        }
      } catch (error) {
        console.error('Error de autenticación:', error)

        setFeedback({
          message: 'No fue posible iniciar la sesión.',
          type: 'danger',
        })

        setLoading(false)
      }
    })

    return () => unsubscribe()
  }, [])

  // Consultar las tareas del usuario en Firestore
  useEffect(() => {
    if (!user) return

    const tasksQuery = query(
      collection(db, 'tasks'),
      where('userId', '==', user.uid)
    )

    const unsubscribe = onSnapshot(
      tasksQuery,
      (snapshot) => {
        const savedTasks = snapshot.docs.map((document) => ({
          id: document.id,
          ...document.data(),
        }))

        setTasks(savedTasks)
        setLoading(false)
      },
      (error) => {
        console.error('Error al consultar tareas:', error)

        setFeedback({
          message: 'No fue posible cargar las tareas.',
          type: 'danger',
        })

        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [user])

  // Registrar una tarea en Firestore
  async function handleAddTask(newTask) {
    if (!user) return

    try {
      const { id, ...taskData } = newTask

      await addDoc(collection(db, 'tasks'), {
        ...taskData,
        userId: user.uid,
        completed: false,
        createdAt: new Date(),
      })

      setFeedback({
        message: '¡La tarea se registró correctamente!',
        type: 'success',
      })
    } catch (error) {
      console.error('Error al registrar tarea:', error)

      setFeedback({
        message: 'No fue posible guardar la tarea.',
        type: 'danger',
      })
    }
  }

  // Cambiar el estado de una tarea
  async function handleToggleTask(id) {
    try {
      const selectedTask = tasks.find((task) => task.id === id)

      if (!selectedTask) return

      await updateDoc(doc(db, 'tasks', id), {
        completed: !selectedTask.completed,
      })

      setFeedback({
        message: 'El estado de la tarea se actualizó.',
        type: 'info',
      })
    } catch (error) {
      console.error('Error al actualizar tarea:', error)

      setFeedback({
        message: 'No fue posible actualizar la tarea.',
        type: 'danger',
      })
    }
  }

  // Eliminar una tarea
  async function handleDeleteTask(id) {
    try {
      await deleteDoc(doc(db, 'tasks', id))

      setFeedback({
        message: 'La tarea se eliminó correctamente.',
        type: 'warning',
      })
    } catch (error) {
      console.error('Error al eliminar tarea:', error)

      setFeedback({
        message: 'No fue posible eliminar la tarea.',
        type: 'danger',
      })
    }
  }

  const pendingTasks = tasks.filter(
    (task) => !task.completed
  ).length

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length

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

        {loading && (
          <div className="alert alert-info" role="status">
            Conectando con UniTareas...
          </div>
        )}

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
          onClose={() =>
            setFeedback({
              message: '',
              type: 'success',
            })
          }
        />

        <TaskForm onAddTask={handleAddTask} />

        <TaskList
          tasks={tasks}
          onToggleTask={handleToggleTask}
          onDeleteTask={handleDeleteTask}
        />

        <HolidayList />

        <Assistant tasks={tasks} />

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
