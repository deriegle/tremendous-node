class TremendousResponse {
  constructor(response, data, error) {
    this.response = response;
    this.data = data;
    this.error = error;
  }

  get statusCode() {
    return this.response ? this.response.status : null;
  }

  get isSuccess() {
    return this.statusCode >= 200 && this.statusCode < 300;
  }

  get isError() {
    return !this.isSuccess || !!this.error;
  }
}

module.exports = TremendousResponse;
