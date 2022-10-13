class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ServerError';
    this.statusCode = 500;
    this.message = 'Произошла ошибка';
  }
}

module.exports = ServerError;
