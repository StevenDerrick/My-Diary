export default class Responsender {
  constructor() {
    this.statusCode = null;
    this.message = null;
    this.data = null;
  }

  error(statusCode, error) {
    this.statusCode = statusCode;
    this.message = error;
  }

  send(res) {
    const result = {
      status: this.statusCode,
      message: this.message,
      data: this.data,
    };
    return res.status(this.statusCode).json(result);
  }
}
