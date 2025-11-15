export class Logger {
  log(message) {
    console.log(message);
  }

  info(message) {
    console.log(`INFO: ${message}`);
  }

  success(message) {
    console.log(`SUCCESS: ${message}`);
  }

  warn(message) {
    console.log(`WARN: ${message}`);
  }

  error(message) {
    console.error(`ERROR: ${message}`);
  }

  debug(message) {
    console.log(`DEBUG: ${message}`);
  }

  data(message) {
    console.log(`DATA: ${message}`);
  }
}