import MonitorStatusLabel from './monitorStatusLabel'
import MonitorHistogram from './monitorHistogram'

export default function MonitorCard({ monitor, data, config }) {
  return (
    <section className="p-4 bg-white border border-gray-200 dark:bg-gray-700 dark:border-gray-600 shadow rounded-lg mb-2">
      <header className="flex flex-row justify-between items-center mb-2">
        <hgroup className="flex flex-row items-center align-center">
          {monitor.description && (
            <aside className="relative tooltip">
              <svg
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                className="h-5 mr-2 mx-auto text-blue-500 dark:text-blue-400"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="
                  content
                  invisible 
                  absolute z-50 inline-block
                  rounded-lg bg-gray-100 dark:bg-gray-800 shadow
                  opacity-0 transition-all duration-200 scale-50
                  text-center transform -translate-y-1/2 top-1/2 ml-8 w-72 text-sm object-left
              ">
                { monitor.description }
              </p>
            </aside>
          )}
          {(monitor.linkable === true || monitor.linkable === undefined) ?
            (
              <a href={ monitor.url } target="_blank" rel="noreferrer" className="text-[#61dafb]">
                <h2 className="text-xl">{ monitor.name }</h2>
              </a>
            )
            :
            (
              <h2 className="text-xl">{ monitor.name }</h2>
            )
          }

        </hgroup>
        <MonitorStatusLabel kvMonitor={data} config={config} />
      </header>

      <MonitorHistogram monitorId={monitor.id} kvMonitor={data} config={config} />

      <footer className="flex flex-row justify-between items-center text-gray-400 text-sm">
        <span>{config.settings.daysInHistogram} days ago</span>
        <span>Today</span>
      </footer>
    </section>
  )
}