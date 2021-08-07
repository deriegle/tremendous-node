class TremendousResponse {
  constructor(response, error) {
    this.response = response;
    this.error = error;
  }

  get statusCode() {
    return response ? response.status : null;
  }

  get isSuccess() {
    return statusCode >= 200 && statusCode < 300;
  }

  get isError() {
    return !this.isSuccess() || !!this.error;
  }

  async responseJson() {
    try {
      return response.json();
    } catch (err) {
      return {};
    }
  }
}

module.exports = TremendousResponse;
