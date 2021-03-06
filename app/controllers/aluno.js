module.exports.salvar = function(app, req, res) {
  const aluno = req.body;

  req.assert("name", "Nome é obrigatório").notEmpty();
  req.assert("email", "Email é obrigatório").notEmpty();
  req.assert("address", "Endereço é obrigatório").notEmpty();
  req.assert("phone", "Telefone é obrigatório").notEmpty();
  req.assert("punctuation", "Nota é obrigatório");

  const erros = req.validationErrors();

  if (erros) {
    res.status(400).send({
      error: "Erro ao tentar salvar",
      data: [],
      fields_validation: erros
    });
    return;
  }

  const connection = app.config.dbConnection();
  const alunosModel = new app.app.models.AlunosDAO(connection);

  alunosModel.salvar(aluno, function(error, result) {
    console.log(result);
    res.status(201).send({
      error: "Aluno salvo com sucesso",
      data: [{student_id: result.insertId}],
      fields_validation: []
    });
  });
};

module.exports.deletar = function(app, req, res) {
  req.assert("student_id", "idAluno é obrigatório no parâmetro").notEmpty();

  const erros = req.validationErrors();

  if (erros) {
    res.status(400).send({
      error: "Erro no parâmetro",
      data: [],
      fields_validation: erros
    });
    return;
  }

  const connection = app.config.dbConnection();
  const alunosModel = new app.app.models.AlunosDAO(connection);

  alunosModel.deletar(req.params.student_id, function(error, result) {
    if (error) {
      console.log(result + " " + error);
      res.status(400).send({ error: "Erro ao tentar deletar", data: [], fields_validation: [] });
      return;
    }

    res.status(201).send({
      error: `Aluno deletado com sucesso`,
      data: [],
      fields_validation: []
    });
  });
};

module.exports.buscarTodos = function(app, req, res) {
  const connection = app.config.dbConnection();
  const alunosModel = new app.app.models.AlunosDAO(connection);

  alunosModel.buscarTodos(function(error, result) {
    if (error) {
      console.log(result + " " + error);
      res.status(400).send({ error: "Erro ao tentar buscar", data: [], fields_validation: [] });
      return;
    }

    if (result != undefined && result.length == 0) {
      res.status(200).send({
        error: "Nenhum aluno cadastrado",
        data: [],
        fields_validation: []
      });
      return;
    }

    res.status(200).send({
      error: "",
      data: result,
      fields_validation: []
    });
  });
};

module.exports.buscarPorId = function(app, req, res) {
  req.assert("student_id", "student_id é obrigatório no parâmetro").notEmpty();

  const erros = req.validationErrors();

  if (erros) {
    res.status(400).send({
      error: "Erro no parâmetro",
      data:[],
      fields_validation: erros
    });
    return;
  }

  const connection = app.config.dbConnection();
  const alunosModel = new app.app.models.AlunosDAO(connection);

  alunosModel.buscarPorId(req.params.student_id, function(error, result) {
    if (error) {
      console.log(result + " " + error);
      res.status(400).send({ error: "Erro ao tentar buscar" + error, data: [], fields_validation: [] });
      return;
    }

    console.log(result);

    if (result.length === 0) {
      console.log("Nenhum aluno encontrado");
      res.status(200).send({
        error: "Nenhum aluno com esse id",
        data: [],
        fields_validation: []
      });
      return;
    }

    res.status(200).send({
      error: "",
      data: result,
      fields_validation: []
    });
  });
};
