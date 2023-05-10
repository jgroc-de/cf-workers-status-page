import { locations } from '../functions/locations'

const cssClasses = {
  green:
    'bg-green-200 text-green-700 dark:bg-green-700 dark:text-green-200 border-green-300 dark:border-green-600',
  yellow:
    'bg-yellow-200 text-yellow-700 dark:bg-yellow-700 dark:text-yellow-200 border-yellow-300 dark:border-yellow-600',
}

export default function MonitorStatusHeader({ kvMonitorsLastUpdate }) {
  let color = 'green'
  let text = "All Systems Operational"

  if (!kvMonitorsLastUpdate || !kvMonitorsLastUpdate.allOperational) {
    color = 'yellow'
    text = "Not All Systems Operational"
  }
  let time = null
  let city = null
  if (kvMonitorsLastUpdate && kvMonitorsLastUpdate.time) {
    time = Math.round((Date.now() - kvMonitorsLastUpdate.time) / 1000)
    city = locations[kvMonitorsLastUpdate.loc] || kvMonitorsLastUpdate.loc
  }

  return (
    <section className={`
      p-[1rem] border-[1px] rounded-[0.5rem] mb-4 font-semibold
      ${ cssClasses[color] }
      flex flex-row justify-between items-center
      `}>
        <span>{ text }</span>
        { time && typeof window !== 'undefined' && (
          <span className="text-xs font-light">checked { time } sec ago (from { city })</span>
        )}
    </section>
  )
}