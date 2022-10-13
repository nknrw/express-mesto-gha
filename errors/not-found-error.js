class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
    this.message = 'Запрашиваемый ресурс не найден';
  }
}

module.exports = NotFoundError;
