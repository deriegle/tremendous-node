class TremendousResponse {
  constructor(response, error) {
    this.response = response;
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

  json() {
    return this.response.json().catch(() => ({}));
  }
}

module.exports = TremendousResponse;
