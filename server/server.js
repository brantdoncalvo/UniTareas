
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3001

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
  ],
}))

app.use(express.json({ limit: '20kb' }))

app.post('/api/assistant', (req, res) => {
  try {
    const { question, tasks } = req.body

    if (!question || typeof question !== 'string' || !question.trim()) {
      return res.status(400).json({
        error: 'Escribe una pregunta para el asistente.',
      })
    }

    if (!Array.isArray(tasks)) {
      return res.status(400).json({
        error: 'No se recibieron las tareas correctamente.',
      })
    }

    const pendingTasks = tasks.filter((task) => !task.completed)
    const completedTasks = tasks.filter((task) => task.completed)

    const priorityValue = {
      Alta: 3,
      Media: 2,
      Baja: 1,
    }

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const sortedTasks = [...pendingTasks].sort((a, b) => {
      const priorityA = priorityValue[a.priority] || 0
      const priorityB = priorityValue[b.priority] || 0

      if (priorityA !== priorityB) {
        return priorityB - priorityA
      }

      return new Date(a.dueDate) - new Date(b.dueDate)
    })

    const recommendations = sortedTasks.map((task) => {
      const dueDate = new Date(`${task.dueDate}T00:00:00`)
      const daysRemaining = Math.ceil(
        (dueDate - today) / (1000 * 60 * 60 * 24)
      )

      let urgency = 'Tiene tiempo disponible'

      if (daysRemaining < 0) {
        urgency = 'La fecha de entrega ya pasó'
      } else if (daysRemaining === 0) {
        urgency = 'Se entrega hoy'
      } else if (daysRemaining <= 3) {
        urgency = 'Entrega próxima'
      }

      return {
        ...task,
        daysRemaining,
        urgency,
      }
    })

    let answer = ''

    if (pendingTasks.length === 0) {
      answer = '¡Excelente trabajo! No tienes tareas pendientes. '
        + 'Puedes aprovechar este tiempo para repasar tus asignaturas '
        + 'o adelantar nuevas actividades.'
    } else {
      const firstTask = recommendations[0]

      answer = `Tienes ${pendingTasks.length} tarea(s) pendiente(s) `
        + `y ${completedTasks.length} completada(s).\n\n`

      answer += `Mi primera recomendación es comenzar con `
        + `"${firstTask.title}", de ${firstTask.subject}. `
        + `Su prioridad es ${firstTask.priority} y su situación es: `
        + `${firstTask.urgency.toLowerCase()}.\n\n`

      answer += 'Este es tu orden recomendado de trabajo:\n\n'

      recommendations.forEach((task, index) => {
        answer += `${index + 1}. ${task.title} `
          + `(${task.subject}) - Prioridad ${task.priority}. `
          + `Entrega: ${task.dueDate}. ${task.urgency}.\n`
      })

      answer += '\nOrganiza sesiones de estudio, '
        + 'comienza por la actividad más importante '
        + 'y toma descansos entre sesiones.'
    }

    const normalizedQuestion = question.toLowerCase()

    if (
      normalizedQuestion.includes('prioridad') ||
      normalizedQuestion.includes('primero')
    ) {
      answer += '\n\nConsejo: evita dejar para el final '
        + 'las actividades de prioridad alta.'
    }

    if (
      normalizedQuestion.includes('plan') ||
      normalizedQuestion.includes('organizar')
    ) {
      answer += '\n\nPlan sugerido:\n'
        + '1. Comienza con la tarea más urgente.\n'
        + '2. Dedica un bloque de tiempo a cada actividad.\n'
        + '3. Revisa los avances al terminar cada sesión.\n'
        + '4. Actualiza el estado de tus tareas en UniTareas.'
    }

    res.json({
      answer,
      totalTasks: tasks.length,
      pendingTasks: pendingTasks.length,
      completedTasks: completedTasks.length,
      recommendations,
    })

  } catch (error) {
    console.error('Error en el asistente:', error)

    res.status(500).json({
      error: 'No fue posible generar las recomendaciones.',
    })
  }
})

app.listen(PORT, () => {
  console.log(`Asistente UniTareas disponible en http://localhost:${PORT}`)
})
