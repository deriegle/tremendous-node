const TremendousClient = require('../lib/client');
const fetchMock = require('fetch-mock');

const getOrganizationsFixture = require('./fixtures/getOrganizations.json');
const getProductsFixture = require('./fixtures/getProducts.json');
const getOrdersFixture = require('./fixtures/getOrders.json');
const getOrderFixture = require('./fixtures/getOrder.json');
const getRewardFixture = require('./fixtures/getReward.json');
const getFundingSourcesFixture = require('./fixtures/getFundingSources.json');
const getFundingSourceFixture = require('./fixtures/getFundingSource.json');

describe('TremendousClient', () => {
  test('it throws when not given an accessToken', () => {
    expect(() => new TremendousClient()).toThrowError(/Access token is required/i);
  });

  test('it throws when not given a URI', () => {
    expect(() => new TremendousClient('1234')).toThrowError(/URI is required/i);
  });

  test('createSandbox', () => {
    const client = TremendousClient.createSandbox('1234');
    expect(client.uri).toBe('https://testflight.tremendous.com/api/v2/');
  });

  test('createProduction', () => {
    const client = TremendousClient.createProduction('1234');
    expect(client.uri).toBe('https://www.tremendous.com/api/v2/');
  });

  test('getOrganizations', async () => {
    fetchMock.get('https://example.com/organizations', getOrganizationsFixture);

    const client = new TremendousClient('1234', 'https://example.com');
    const res = await client.getOrganizations();

    expect(fetchMock.called('https://example.com/organizations')).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(await res.json()).toEqual(getOrganizationsFixture);
  });

  test('getProducts', async () => {
    fetchMock.get('https://example.com/products', getProductsFixture);

    const client = new TremendousClient('1234', 'https://example.com');
    const res = await client.getProducts();

    expect(fetchMock.called('https://example.com/products')).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(await res.json()).toEqual(getProductsFixture);
  });

  test('getOrders', async () => {
    fetchMock.get('https://example.com/orders', getOrdersFixture);

    const client = new TremendousClient('1234', 'https://example.com');
    const res = await client.getOrders();

    expect(fetchMock.called('https://example.com/orders')).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(await res.json()).toEqual(getOrdersFixture);
  });

  test('getOrder', async () => {
    const orderId = 'QABSTARTSFSIO';
    fetchMock.get(`https://example.com/orders/${orderId}`, getOrderFixture);

    const client = new TremendousClient('1234', 'https://example.com');
    const res = await client.getOrder(orderId);

    expect(fetchMock.called(`https://example.com/orders/${orderId}`)).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(await res.json()).toEqual(getOrderFixture);
  });

  test('getReward', async () => {
    const rewardId = 'QABSTARTSFSIO';
    fetchMock.get(`https://example.com/rewards/${rewardId}`, getRewardFixture);

    const client = new TremendousClient('1234', 'https://example.com');
    const res = await client.getReward(rewardId);

    expect(fetchMock.called(`https://example.com/rewards/${rewardId}`)).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(await res.json()).toEqual(getRewardFixture);
  });

  test('getFundingSources', async () => {
    fetchMock.get('https://example.com/funding_sources', getFundingSourcesFixture);

    const client = new TremendousClient('1234', 'https://example.com');
    const res = await client.getFundingSources();

    expect(fetchMock.called('https://example.com/funding_sources')).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(await res.json()).toEqual(getFundingSourcesFixture);
  });

  test('getFundingSource', async () => {
    const fundingSourceId = 'LARFAF2423';
    fetchMock.get(`https://example.com/funding_sources/${fundingSourceId}`, getFundingSourceFixture);

    const client = new TremendousClient('1234', 'https://example.com');
    const res = await client.getFundingSource(fundingSourceId);

    expect(fetchMock.called(`https://example.com/funding_sources/${fundingSourceId}`)).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(await res.json()).toEqual(getFundingSourceFixture);
  });
});
