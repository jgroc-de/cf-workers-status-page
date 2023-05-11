import './App.css';
import MonitorCard from './components/monitorCard'
import MonitorStatusHeader from './components/monitorStatusHeader'
import ThemeSwitcher from './components/themeSwitcher'
import MonitorFilter from './components/monitorFilter';
import Link from './components/link'
import { useState, useEffect } from 'react'
import { useKeyPress } from './functions/helper'
import configs from './config.json'

const config = configs[0]

function App() {
  const [data, setData] = useState({})
  const [kvMonitors, setKvMonitors] = useState({})
  const [saveCount, setSaveCount] = useState(0)


  useEffect(() => {
    async function fetchData() {
      // this fetch will call the worker function defined in functions/data.js
      // so that we can access KV values.
      //setData({"lastUpdate":{"allOperational":true,"time":1683591917167,"loc":"WAW"},"monitors":{"rosaly-app":{"firstCheck":"2023-05-09","lastCheck":{"status":200,"statusText":"OK","operational":true},"checks":{"2023-05-09":{"fails":0,"res":{"WAW":{"n":14,"ms":2430,"a":174}}}}},"companies-admin":{"firstCheck":"2023-05-09","lastCheck":{"status":200,"statusText":"OK","operational":true},"checks":{"2023-05-09":{"fails":0,"res":{"WAW":{"n":14,"ms":2495,"a":178}}}}}}})
      const response = await fetch('/data', { method: 'GET' })
      if (!response.ok) {
        throw new Error('Data coud not be fetched!')
      } else {
        return response.json()
      }
    }
    fetchData()
      .then((jsonResponse) => { setData(jsonResponse) })
      .catch((error) => { console.log(error) })
    ;
  }, [])

  const filterByTerm = (term) => {
    let tmp = config.monitors.filter((monitor) => {
      return monitor.name.toLowerCase().includes(term)
    })
    setKvMonitors(tmp)
  }

  if (data && data.monitors && saveCount !== data.monitors.length) {
    setSaveCount(data.monitors.length)
    setKvMonitors(config.monitors)
  }
  //let kvMonitors = data ? data.monitors : {}
  let kvMonitorsLastUpdate =  data ? data.lastUpdate : {}

  return (
    <main className="container mx-auto px-4 min-h-screen App text-center">
      <header className="flex flex-row justify-between items-center p-4">
        <hgroup className="flex flex-row items-center">
          <img className="h-8 w-auto App-logo" src="logo192.png" alt="logo"/>
          <h1 className="ml-4 text-3xl">Status Page</h1>
        </hgroup>
        <div className="flex flex-row items-center">
          { typeof window !== 'undefined' && <ThemeSwitcher /> }
          <MonitorFilter active={ useKeyPress('/') } callback={ filterByTerm } />
        </div>
      </header>
      <MonitorStatusHeader kvMonitorsLastUpdate={kvMonitorsLastUpdate} />
      { Object.keys(kvMonitors).length > 0 && kvMonitors.map((monitor, key) => { return (
        <MonitorCard key={key} monitor={monitor} data={data.monitors[monitor.id]} config={config} />
      )}) }
      <footer className="flex flex-row justify-between mt-4 text-sm">
        <p>Powered by <Link href={ "https://workers.cloudflare.com/" } text={ "Cloudflare Workers" } /></p>
        <Link href={ "https://github.com/jgroc-de/cf-workers-status-page" } text={ "Get Your Status Page" } />
      </footer>
    </main>
  );
}

export default App;
