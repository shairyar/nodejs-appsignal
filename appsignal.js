const { Appsignal } = require("@appsignal/nodejs")

exports.appsignal = new Appsignal({
  active: true,
  name: "Node Example",
  push_api_key: process.env.APPSIGNAL_PUSH_API_KEY,
  environment: "development",
  lov_level: "trace",
  logPath: "logs"
})
