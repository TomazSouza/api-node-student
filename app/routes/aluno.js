module.exports = function(app) {
  // Create
  app.post("/salvar", function(req, res) {
    app.app.controllers.aluno.salvar(app, req, res);
  });

  // Delete
  app.delete("/excluir/:student_id", (req, res) => {
    app.app.controllers.aluno.deletar(app, req, res);
  });

  // Read
  app.get("/alunos", (req, res) => {
    app.app.controllers.aluno.buscarTodos(app, req, res);
  });

  // Read By Id
  app.get("/aluno/:student_id", (req, res) => {
    app.app.controllers.aluno.buscarPorId(app, req, res);
  });

  app.get("/", (req, res) => {
    res.status(200).send({
      msg: "API On-line"
    });
  })
};
