const { appsignal } = require("./appsignal");
const tracer = appsignal.tracer();

module.exports = {
  handleError
};

function handleError(error) {
  tracer.currentSpan().addError(error);
}
