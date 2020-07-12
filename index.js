const app = require("./config/server");
const utils_1 = require("./utils");
const http = require("http");

const cluster = require("cluster");
const os = require("os");
const numCPUs = os.cpus().length;

//const port = 8080;
const port = 3000;
//const host = "159.203.80.155";
//const host = "127.0.0.1";
const server = http.createServer(app);
//const port = 8080;
const host = process.env.host || "127.0.0.1";

if (cluster.isMaster) {
  console.log("Master process is running");

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${
        worker.process.pid
      } died with code: ${code}, and signal: ${signal}`
    );
    console.log("Starting a new worker");
    cluster.fork();
  });
} else {
  server.listen(port, host);
  server.on("error", utils_1.onError(server));
  server.on("listening", utils_1.onListening(server));
}
