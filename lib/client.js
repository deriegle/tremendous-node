const TremendousResponse = require('./response');
const fetch = require('node-fetch');
const jwt = require('jsonwebtoken');

class TremendousClient {
  constructor(accessToken, uri) {
    this.accessToken = accessToken;
    this.uri = uri;
  }

  async createOrganization = (options) => this.request('organizations', 'POST', options);

  async getOrganizations = ()  => this.request('organizations', 'GET');

  async getProducts = (options) => this.request('products', 'GET', options);

  async createOrder = (options) => this.request('orders', 'POST', options);

  async getOrders = (options) => this.request('orders', 'GET', options);

  async getOrder = (orderId)  => this.request(`orders/${orderId}`, 'GET');

  async getReward = (rewardId)  => this.request(`rewards/${rewardId}`, 'GET');

  async getFundingSources = (options)  => this.request('funding_sources', 'GET', options);

  async tokenizeEmbed = (payload) => jwt.sign(payload, this.accessToken, {
    algorithm: 'HS256',
  });

  async #request(path, method, options) {
    const query = new URLSearchParameters(method === 'GET' ? options : {});
    const url = `${this.uri}${path}${query}`;

    return fetch(url, {
      method,
      headers: {
        "User-agent": "Tremendous Node (Promises) v2.0.0",
        "Authorization": "Bearer " + this.accessToken
      },
      body: method !== 'GET' && typeof options === 'object' ? JSON.stringify(options) : undefined,
    })
      .then((res) => new TremendousResponse(res, null))
      .catch((err) => new TremendousResponse(null, error));
  }
}


module.exports = TremendousClient;

