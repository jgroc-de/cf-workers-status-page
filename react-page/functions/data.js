async function getKVMonitors(kvNamespace) {
  //return {"lastUpdate":{"allOperational":true,"time":1683591917167,"loc":"WAW"},"monitors":{"rosaly-app":{"firstCheck":"2023-05-09","lastCheck":{"status":200,"statusText":"OK","operational":true},"checks":{"2023-05-09":{"fails":0,"res":{"WAW":{"n":14,"ms":2430,"a":174}}}}},"companies-admin":{"firstCheck":"2023-05-09","lastCheck":{"status":200,"statusText":"OK","operational":true},"checks":{"2023-05-09":{"fails":0,"res":{"WAW":{"n":14,"ms":2495,"a":178}}}}}}}
  return await kvNamespace.get('monitors_data_v1_1')
}

export async function onRequest(context) {
  return new Response(await getKVMonitors(context.env.TEST))
}
