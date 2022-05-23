const { appsignal } = require("./appsignal");
const http = require("http");
const tracer = appsignal.tracer();
const axios = require("axios").default;

const hostname = "127.0.0.1";
const port = 3000;

tracer.withSpan(tracer.createSpan(), (span) => {
  span.setName("BackgroundWorker.perform");
  const server = http.createServer((req, res) => {
    // Make a request for a users
    axios
      .get("https://reqres.in/api/users")
      .then(function (response) {
        // handle success
        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Hello World");
    span.close(); // don't forget to close the span if you're done with it!
  });

  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
});
