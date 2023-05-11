import React from 'react'
import MonitorDayAverage from './monitorDayAverage'

export default function MonitorHistogram({ monitorId, kvMonitor, config }) {
  // create date and set date - daysInHistogram for the first day of the histogram
  let date = new Date()
  date.setDate(date.getDate() - config.settings.daysInHistogram)

  let content = null

  if (typeof window !== 'undefined') {
    content = Array.from(Array(config.settings.daysInHistogram).keys()).map(
      (key) => {
        date.setDate(date.getDate() + 1)
        const dayInHistogram = date.toISOString().split('T')[0]

        let bg = ''
        let dayInHistogramLabel = config.settings.dayInHistogramNoData

        // filter all dates before first check, then check the rest
        if (kvMonitor && kvMonitor.firstCheck <= dayInHistogram) {
          if (
            kvMonitor.checks.hasOwnProperty(dayInHistogram) &&
            kvMonitor.checks[dayInHistogram].fails > 0
          ) {
            bg = 'yellow'
            dayInHistogramLabel = `${kvMonitor.checks[dayInHistogram].fails} ${config.settings.dayInHistogramNotOperational}`
          } else {
            bg = 'green'
            dayInHistogramLabel = config.settings.dayInHistogramOperational
          }
        }

        return (
          <li key={ key } className="w-full h-full p-[1px] relative items-end box-border rounded-[3.75px] tooltip">
            <div className={`${bg} bg-gray-300 dark:bg-gray-600 bar h-full p-[1px] rounded-[100px] w-[85%]`} />
            <div className="
              content
              invisible absolute z-50 inline-block
              rounded-lg bg-gray-100 dark:bg-gray-800 shadow
              opacity-0 transition-all duration-200 scale-50
              text-center
              py-1 px-2 mt-2 left-1/2 -ml-20 w-40 text-xs
              ">
              { dayInHistogram }
              <br />
              <span className="font-semibold text-sm">
                {dayInHistogramLabel}
              </span>
              { kvMonitor &&
                kvMonitor.checks.hasOwnProperty(dayInHistogram) &&
                Object.keys(kvMonitor.checks[dayInHistogram].res).map((key) => {
                  return (
                    <MonitorDayAverage
                      key={ key }
                      location={ key }
                      avg={ kvMonitor.checks[dayInHistogram].res[key].a }
                    />
                  )
                }) }
            </div>
          </li>
        )
      },
    )
  }

  return (
    <ul
      key={`${monitorId}-histogram`}
      className="flex flex-row items-center h-6 w-full mx-auto"
    >
      { content }
    </ul>
  )
}