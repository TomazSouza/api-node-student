const app = require("./config/server");
const utils_1 = require("./utils");
const http = require("http");

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const cluster = require("cluster");
const os = require("os");
const numCPUs = os.cpus().length;

const server = http.createServer(app);

const port = process.env.PORT || 5000;
const host = '127.0.0.1';

const swaggerOptions = {
  swaggerDefinition: {
      info: {
          title: 'Customer API',
          description: "Customer API Information",
          contact: {
              name: "Amazing Developer"
          },
          servers: ['http://localhost:5000']
      }
  },
  apis: ["index.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Routes
/**
 * @swagger
 * /customers:
 *  get:
 *      description: Use to request all customers
 *      responses:
 *          '200':
 *              description: A successfull response
 */
app.get('/customers',(req, res) => {
  res.status(200).send('Customer results');
});

// Create
app.post("/salvar", function(req, res) {
  app.app.controllers.aluno.salvar(app, req, res);
});

// Delete
app.delete("/excluir/:student_id", (req, res) => {
  app.app.controllers.aluno.deletar(app, req, res);
});

// Read
/**
 * @swagger
 * /students:
 *    get:
 *      description: Get all students
 *      responses:
 *          '200':
 *            description: A successfull response
 *          '500':
 *             description: Error server
 */
app.get("/students", (req, res) => {
  app.app.controllers.aluno.buscarTodos(app, req, res);
});

/**
 * @swagger
 * paths:
 *  /student/{student_id}:
 *      get:
 *        parameters:
 *          - in: path
 *            name: student_id
 *            schema:
 *               type: string
 *            required: true
 *            description: String ID of the student to get
 *        responses:
 *            '200':
 *              description: A successfull response
 *            '302':
 *              description: Parameter error
 *            '404':
 *              description: No student found
 *            '500':
 *              description: Error server
 */
app.get("/student/:student_id", (req, res) => {
  app.app.controllers.aluno.buscarPorId(app, req, res);
});

/**
 * @swagger
 * /status:
 *    get:
 *      description: Get status API
 *      responses:
 *          '200':
 *            description: A successfull response
 */
app.get("/status", (req, res) => {
  res.status(200).send({
    message: "API On-line",
    is_error: false,
    data: [],
    fields_validation: []
  });
})

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
