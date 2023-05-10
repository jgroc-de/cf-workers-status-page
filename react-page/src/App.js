import './App.css';
import MonitorCard from './components/monitorCard'
import MonitorStatusHeader from './components/monitorStatusHeader'
import ThemeSwitcher from './components/themeSwitcher'
import Link from './components/link'
import { useState, useEffect } from 'react'
import configs from './config.json'

const config = configs[0]

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/data', { method: 'GET' })
      if (!response.ok) {
        throw new Error('Data coud not be fetched!')
      } else {
        return response.json()
      }
    }
    fetchData()
      .then((jsonResponse) => {
        console.log(jsonResponse)
        setData(jsonResponse)
      })
      .catch((error) => { console.log(error) })
    ;
  }, [])

  let kvMonitors = data ? data.monitors : {}
  let kvMonitorsLastUpdate =  data ? data.lastUpdate : {}

  return (
    <div className="min-h-screen App">
      <div className="container mx-auto px-4">
        <div className="flex flex-row justify-between items-center p-4">
          <div className="flex flex-row items-center">
            <img className="h-8 w-auto" src="logo-192.png" alt="logo"/>
            <h1 className="ml-4 text-3xl">Status Page</h1>
          </div>
          <div className="flex flex-row items-center">
            {typeof window !== 'undefined' && <ThemeSwitcher />}
          </div>
        </div>
        <MonitorStatusHeader kvMonitorsLastUpdate={kvMonitorsLastUpdate} />
        { kvMonitors && config.monitors.map((monitor) => {
          return (<MonitorCard monitor={monitor} data={kvMonitors[monitor.id]} config={config} />)
        }) }
        <div className="flex flex-row justify-between mt-4 text-sm">
          <div>
            Powered by <Link href={ "https://workers.cloudflare.com/" } text={ "Cloudflare Workers" } />
          </div>
          <Link href={ "https://github.com/jgroc-de/cf-workers-status-page" } text={ "Get Your Status Page" } />
        </div>
      </div>
    </div>
  );
}

export default App;
