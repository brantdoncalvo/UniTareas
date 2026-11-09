
import { useState } from 'react'

function Assistant({ tasks }) {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleAskAssistant(event) {
    event.preventDefault()

    if (!question.trim()) {
      setError('Escribe una pregunta para continuar.')
      return
    }

    try {
      setLoading(true)
      setError('')
      setAnswer('')

      const response = await fetch(
        'http://localhost:3001/api/assistant',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question,
            tasks,
          }),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'No fue posible obtener una respuesta.')
      }

      setAnswer(data.answer)
    } catch (error) {
      setError(
        'No fue posible conectar con el asistente. Verifica que el servidor esté iniciado.'
      )
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="asistente" className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="h4">Asistente académico</h2>

        <p className="text-secondary">
          Consulta recomendaciones para organizar tus actividades académicas.
        </p>

        <form onSubmit={handleAskAssistant}>
          <div className="mb-3">
            <label htmlFor="assistantQuestion" className="form-label">
              ¿En qué puedo ayudarte?
            </label>

            <textarea
              id="assistantQuestion"
              className="form-control"
              rows="3"
              placeholder="Ejemplo: ¿Qué tarea debería realizar primero?"
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Analizando tus tareas...' : 'Consultar asistente'}
          </button>
        </form>

        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}

        {answer && (
          <div className="alert alert-info mt-3" role="status">
            <h3 className="h6">Recomendación académica</h3>
            <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>
              {answer}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default Assistant
