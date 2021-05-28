const { Appsignal } = require("@appsignal/nodejs")

exports.appsignal = new Appsignal({
  active: true,
  name: "Node Example",
  apiKey: process.env.APPSIGNAL_PUSH_API_KEY,
  environment: "development",
  debug: true,
  logPath: "logs"
})