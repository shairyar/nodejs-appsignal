const { appsignal } = require("./appsignal");
const { handleError } = require("./handler")
const http = require("http");
const https = require("https");
const tracer = appsignal.tracer();

const hostname = "127.0.0.1";
const port = 3000;

tracer.withSpan(tracer.createSpan(), span => {
  span.setName("GET /");
  const server = http.createServer((req, res) => {
    tracer.withSpan(span.child(), (child) => {
      child
      .setName("GET /users")
      .setCategory("process_request.http")
      https
        .get("https://WRONGURL", (res) => {
          let data = [];
          const headerDate =
            res.headers && res.headers.date
              ? res.headers.date
              : "no response date";
          console.log("Status Code:", res.statusCode);
          console.log("Date in Response header:", headerDate);

          res.on("data", (chunk) => {
            data.push(chunk);
          });

          res.on("end", () => {
            console.log("Response ended: ");
            const users = JSON.parse(Buffer.concat(data).toString());

            for (user of users) {
              console.log(`Got user with id: ${user.id}, name: ${user.name}`);
            }
          });
        })
        .on("error", (err) => {
          console.log("Error: ", err.message);
          handleError(err)
        });
     child.close(); // don't forget to close the span if you're done with it!
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
