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
  afterEach(() => {
    fetchMock.restore();
  });

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
    fetchMock.get(/api\/v2\/organizations/, getOrganizationsFixture);

    const client = TremendousClient.createSandbox('1234');
    const res = await client.getOrganizations();

    expect(fetchMock.called(/api\/v2\/organizations/)).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(await res.json()).toEqual(getOrganizationsFixture);
  });

  test('getProducts', async () => {
    fetchMock.get(/api\/v2\/products/, getProductsFixture);

    const client = TremendousClient.createSandbox('1234');
    const res = await client.getProducts();

    expect(fetchMock.called(/api\/v2\/products/)).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(await res.json()).toEqual(getProductsFixture);
  });

  test('getOrders', async () => {
    fetchMock.get(/api\/v2\/orders/, getOrdersFixture);

    const client = TremendousClient.createSandbox('1234');
    const res = await client.getOrders();

    expect(fetchMock.called(/api\/v2\/orders/)).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(await res.json()).toEqual(getOrdersFixture);
  });

  test('getOrder', async () => {
    const orderId = 'QABSTARTSFSIO';
    fetchMock.get(/api\/v2\/orders\/QABSTARTSFSIO/, getOrderFixture);

    const client = TremendousClient.createSandbox('1234');
    const res = await client.getOrder(orderId);

    expect(fetchMock.called(/api\/v2\/orders\/QABSTARTSFSIO/)).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(await res.json()).toEqual(getOrderFixture);
  });

  test('getReward', async () => {
    const rewardId = 'QABSTARTSFSIO';
    fetchMock.get(/api\/v2\/rewards\/QABSTARTSFSIO/, getRewardFixture);

    const client = TremendousClient.createSandbox('1234');
    const res = await client.getReward(rewardId);

    expect(fetchMock.called(/api\/v2\/rewards\/QABSTARTSFSIO/)).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(await res.json()).toEqual(getRewardFixture);
  });

  test('getFundingSources', async () => {
    fetchMock.get(/api\/v2\/funding_sources/, getFundingSourcesFixture);

    const client = TremendousClient.createSandbox('1234');
    const res = await client.getFundingSources();

    expect(fetchMock.called(/api\/v2\/funding_sources/)).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(await res.json()).toEqual(getFundingSourcesFixture);
  });

  test('getFundingSource', async () => {
    const fundingSourceId = 'LARFAF2423';
    fetchMock.get(/api\/v2\/funding_sources\/LARFAF2423/, getFundingSourceFixture);

    const client = TremendousClient.createSandbox('1234');
    const res = await client.getFundingSource(fundingSourceId);

    expect(fetchMock.called(/api\/v2\/funding_sources\/LARFAF2423/)).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(await res.json()).toEqual(getFundingSourceFixture);
  });
});
