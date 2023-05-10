const cssClasses = {
  gray: 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200',
  green: 'bg-green-200 text-green-800 dark:bg-green-800 dark:text-green-200',
  yellow: 'bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200',
}

export default function MonitorStatusLabel({ kvMonitor, config }) {
  let color = 'gray'
  let text = 'No data'

  if (typeof kvMonitor !== 'undefined') {
    if (kvMonitor.lastCheck.operational) {
      color = 'green'
      text = config.settings.monitorLabelOperational
    } else {
      color = 'yellow'
      text = config.settings.monitorLabelNotOperational
    }
  }

  return <div
      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full  ${cssClasses[color]}`}
    >
      { text }
    </div>
}
