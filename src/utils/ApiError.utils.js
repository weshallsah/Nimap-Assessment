class ApiError {
  constructor(status, error, message) {
    this.status = status;
    this.error = error;
    this.message = message;
    this.success = status > 400;
  }
}

export { ApiError };
