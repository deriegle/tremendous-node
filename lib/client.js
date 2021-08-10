const TremendousResponse = require('./response');
const jwt = require('jsonwebtoken');
const { URLSearchParams } = require('url');

const SANDBOX_URL = 'https://testflight.tremendous.com/api/v2/';
const PRODUCTION = 'https://www.tremendous.com/api/v2/';

class TremendousClient {
  #accessToken;

  constructor(accessToken, uri) {
    if (!accessToken) {
      throw new Error('Access token is required.');
    }

    if (!uri) {
      throw new Error('URI is required.');
    }

    this.#accessToken = accessToken;
    this.uri = uri;
  }

  static createSandbox(accessToken) {
    return new TremendousClient(accessToken, SANDBOX_URL);
  }

  static createProduction(accessToken) {
    return new TremendousClient(accessToken, PRODUCTION);
  }

  createOrganization = (options) => this.#request('organizations', 'POST', options);

  getOrganizations = ()  => this.#request('organizations', 'GET');

  getProducts = (options) => this.#request('products', 'GET', options);

  createOrder = (options) => this.#request('orders', 'POST', options);

  getOrders = (options) => this.#request('orders', 'GET', options);

  getOrder = (orderId)  => this.#request(`orders/${orderId}`, 'GET');

  getReward = (rewardId)  => this.#request(`rewards/${rewardId}`, 'GET');

  getFundingSources = (options)  => this.#request('funding_sources', 'GET', options);

  getFundingSource = (fundingSourceId) => this.#request(`funding_sources/${fundingSourceId}`, 'GET');

  async #request(path, method, options) {
    const query = new URLSearchParams(method === 'GET' ? options : {});
    const separator = this.uri.endsWith('/') ? '' : '/';
    const url = `${this.uri}${separator}${path}${query}` 

    return fetch(url, {
      method,
      headers: {
        "User-agent": "Tremendous Node (Promises) v2.0.0",
        'Content-Type': "application/json",
        Accept: 'application/json',
        Authorization: `Bearer ${this.#accessToken}`,
      },
      body: method !== 'GET' && typeof options === 'object' ? JSON.stringify(options) : undefined,
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        return new TremendousResponse(res, data, null);
      })
      .catch((error) => new TremendousResponse(null, {}, error));
  }
}

module.exports = TremendousClient;

