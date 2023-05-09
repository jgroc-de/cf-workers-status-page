import './App.css';

import { getKVMonitors } from './functions/helpers'
import MonitorCard from './components/monitorCard'
import MonitorStatusHeader from './components/monitorStatusHeader'
import ThemeSwitcher from './components/themeSwitcher'

const config = require('../src/config.json')[0];

function App() {
  let kvMonitors = getKVMonitors().monitors
  let kvMonitorsLastUpdate =  getKVMonitors().lastUpdate

  let rows = []
  for (let monitor of config.monitors) {
    rows.push(<MonitorCard monitor={monitor} data={kvMonitors[monitor.id]}/>)
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
