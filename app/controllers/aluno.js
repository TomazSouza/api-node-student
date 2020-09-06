module.exports.salvar = function (app, req, res) {
  const aluno = req.body;

  req.assert("name", "Nome é obrigatório").notEmpty();
  req.assert("email", "Email é obrigatório").notEmpty();
  req.assert("address", "Endereço é obrigatório").notEmpty();
  req.assert("phone", "Telefone é obrigatório").notEmpty();
  req.assert("punctuation", "Nota é obrigatório");

  const erros = req.validationErrors();

  if (erros) {
    res.status(303).send({
      message: "Erro no corpo da requisição",
      is_error: true,
      data: [],
      fields_validation: erros,
    });
    return;
  }

  const connection = app.config.dbConnection();
  const alunosModel = new app.app.models.AlunosDAO(connection);

  alunosModel.salvar(aluno, function (error, result) {
    res.status(201).send({
      message: "Aluno salvo com sucesso",
      is_error: false,
      data: [{ student_id: result.insertId }],
      fields_validation: [],
    });
  });
};

module.exports.deletar = function (app, req, res) {
  req.assert("student_id", "idAluno é obrigatório no parâmetro").notEmpty();

  const erros = req.validationErrors();

  if (erros) {
    res.status(302).send({
      message: "Erro no parâmetro",
      is_error: true,
      data: [],
      fields_validation: erros,
    });
    return;
  }

  const connection = app.config.dbConnection();
  const alunosModel = new app.app.models.AlunosDAO(connection);

  alunosModel.deletar(req.params.student_id, function (error, result) {
    if (error) {
      res.status(500).send({
        message: "Erro ao tentar deletar",
        is_error: false,
        data: [],
        fields_validation: [],
      });
      return;
    }

    if (result != undefined && result.affectedRows == 0) {
      res.status(404).send({
        message: "Nenhum aluno encontrado",
        is_error: false,
        data: [],
        fields_validation: [],
      });
      return;
    }

    res.status(201).send({
      message: "Aluno deletado com sucesso",
      is_error: false,
      data: [],
      fields_validation: [],
    });
  });
};

module.exports.buscarTodos = function (app, req, res) {
  const connection = app.config.dbConnection();
  const alunosModel = new app.app.models.AlunosDAO(connection);

  alunosModel.buscarTodos(function (error, result) {
    if (error) {
      console.log(result + " " + error);
      res.status(500).send({
        message: "Falha ao tentar buscar",
        is_error: true,
        data: [],
        fields_validation: [],
      });
      return;
    }

    if (result != undefined && result.length == 0) {
      res.status(404).send({
        message: "Nenhum aluno encontrado",
        is_error: false,
        data: [],
        fields_validation: [],
      });
      return;
    }

    res.status(200).send({
      message: null,
      is_error: false,
      data: result,
      fields_validation: [],
    });
  });
};

module.exports.buscarPorId = function (app, req, res) {
  req.assert("student_id", "student id é obrigatório no parâmetro").notEmpty();

  const erros = req.validationErrors();

  if (erros) {
    res.status(302).send({
      message: "Erro no parâmetro",
      is_error: true,
      data: [],
      fields_validation: erros,
    });
    return;
  }

  const connection = app.config.dbConnection();
  const alunosModel = new app.app.models.AlunosDAO(connection);

  alunosModel.buscarPorId(req.params.student_id, function (error, result) {
    if (error) {
      //console.log(result + " " + error);
      res.status(500).send({
        message: "Erro ao tentar buscar",
        is_error: false,
        data: [],
        fields_validation: [],
      });
      return;
    }

    console.log(result);

    if (result.length === 0) {
      //console.log("Nenhum aluno encontrado");
      res.status(404).send({
        message: "Nenhum aluno econtrado " + error,
        is_error: false,
        data: [],
        fields_validation: [],
      });
      return;
    }

    res.status(200).send({
      message: null,
      is_error: false,
      data: result,
      fields_validation: [],
    });
  });
};
