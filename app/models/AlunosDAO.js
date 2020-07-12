function AlunosDAO(connection) {
  this._connection = connection;
}

AlunosDAO.prototype.salvar = function(aluno, callback) {
  const sqlInsert = "INSERT INTO student SET ?";
  this._connection.query(sqlInsert, aluno, callback);
};

AlunosDAO.prototype.deletar = function(student_id, callback) {
  const sqlDeletar = "DELETE FROM student WHERE student_id = ?";
  this._connection.query(sqlDeletar, [student_id], callback);
};

AlunosDAO.prototype.buscarTodos = function(callback) {
  const sqlRead = { sql: "SELECT * FROM student" };
  this._connection.query(sqlRead, callback);
};

AlunosDAO.prototype.buscarPorId = function(student_id, callback) {
  const readById = "SELECT * FROM student WHERE student_id = ?";
  this._connection.query(readById, [student_id], callback);
};

module.exports = function() {
  return AlunosDAO;
};
