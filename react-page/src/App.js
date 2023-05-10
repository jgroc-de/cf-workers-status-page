import './App.css';
import MonitorCard from './components/monitorCard'
import MonitorStatusHeader from './components/monitorStatusHeader'
import ThemeSwitcher from './components/themeSwitcher'
import configs from './config.json'

const config = configs[0]

export async function getMonitorsData() {
  const response = await fetch('/data', { method: 'GET' })
  return response.json()
}

function App() {
  const data = await getMonitorsData()
  let kvMonitors = data.monitors
  let kvMonitorsLastUpdate =  data.lastUpdate

  let rows = []
  for (let monitor of config.monitors) {
    rows.push(<MonitorCard monitor={monitor} data={kvMonitors[monitor.id]} config={config}/>)
  }

  return (
    <div className="min-h-screen App">
      <div className="container mx-auto px-4">
        <div className="flex flex-row justify-between items-center p-4">
          <div className="flex flex-row items-center">
            <img className="h-8 w-auto" src={config.settings.logo} alt="logo"/>
            <h1 className="ml-4 text-3xl">{config.settings.title}</h1>
          </div>
          <div className="flex flex-row items-center">
            {typeof window !== 'undefined' && <ThemeSwitcher />}
          </div>
        </div>
        <MonitorStatusHeader kvMonitorsLastUpdate={kvMonitorsLastUpdate} />
        { rows }
        <div className="flex flex-row justify-between mt-4 text-sm">
          <div>
            Powered by{' '}
            <a
              href="https://workers.cloudflare.com/"
              target="_blank"
              class="text-blue-500 dark:text-blue-400"
              rel="noreferrer"
            >
              Cloudflare Workers{' '}
            </a>
          </div>
          <div>
            <a
              href="https://github.com/jgroc-de/cf-workers-status-page"
              target="_blank"
              class="text-blue-500 dark:text-blue-400"
              rel="noreferrer"
            >
              Get Your Status Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}



export default App;
