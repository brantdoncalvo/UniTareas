
import { useEffect, useState } from 'react'

function HolidayList() {
  const [holidays, setHolidays] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function fetchHolidays() {
      try {
        setLoading(true)
        setError('')

        const year = new Date().getFullYear()

        const response = await fetch(
          `https://date.nager.at/api/v3/PublicHolidays/${year}/CO`
        )

        if (!response.ok) {
          throw new Error('No fue posible consultar los días festivos.')
        }

        const data = await response.json()

        setHolidays(data)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchHolidays()
  }, [])

  return (
    <section className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="h4 mb-3">Días festivos de Colombia</h2>

        {loading && (
          <p className="text-secondary">
            Consultando información...
          </p>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {!loading && !error && (
          <ul className="list-group">
            {holidays.map((holiday) => (
              <li
                key={holiday.date}
                className="list-group-item d-flex justify-content-between flex-wrap gap-2"
              >
                <span>{holiday.localName}</span>
                <span className="text-secondary">
                  {holiday.date}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default HolidayList
