//const kvDataKey = 'monitors_data_v1_1'

export function getKVMonitors() {
  return {"lastUpdate":{"allOperational":true,"time":1683591917167,"loc":"WAW"},"monitors":{"rosaly-app":{"firstCheck":"2023-05-09","lastCheck":{"status":200,"statusText":"OK","operational":true},"checks":{"2023-05-09":{"fails":0,"res":{"WAW":{"n":14,"ms":2430,"a":174}}}}},"companies-admin":{"firstCheck":"2023-05-09","lastCheck":{"status":200,"statusText":"OK","operational":true},"checks":{"2023-05-09":{"fails":0,"res":{"WAW":{"n":14,"ms":2495,"a":178}}}}}}}
  //return KV_STATUS_PAGE.get(kvDataKey, 'json')
}

export async function getCheckLocation() {
  const res = await fetch('https://cloudflare-dns.com/dns-query', {
    method: 'OPTIONS',
  })
  return res.headers.get('cf-ray').split('-')[1]
}