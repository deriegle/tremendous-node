const TremendousClient = require('../lib/client');
const fetchMock = require('fetch-mock');

const getOrganizationsFixture = require('./fixtures/getOrganizations.json');
const createOrganizationFixture = require('./fixtures/createOrganization.json');
const getProductsFixture = require('./fixtures/getProducts.json');
const getOrdersFixture = require('./fixtures/getOrders.json');
const getOrderFixture = require('./fixtures/getOrder.json');
const createOrderFixture = require('./fixtures/createOrder.json');
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

  test('createOrganization', async () => {
    fetchMock.post(/api\/v2\/organizations/, createOrganizationFixture);

    const client = TremendousClient.createSandbox('1234');
    const res = await client.createOrganization({
      parent_id: 'ABC1234DEFG',
      name: 'Apple Inc, Sales Team',
      website: 'https://www.apple.com',
    });

    expect(fetchMock.called(/api\/v2\/organizations/, {
      method: 'POST',
      body: {
        parent_id: 'ABC1234DEFG',
        name: 'Apple Inc, Sales Team',
        website: 'https://www.apple.com',
      },
    })).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(res.data).toEqual(createOrganizationFixture);
  });

  test('getOrganizations', async () => {
    fetchMock.get(/api\/v2\/organizations/, getOrganizationsFixture);

    const client = TremendousClient.createSandbox('1234');
    const res = await client.getOrganizations();

    expect(fetchMock.called(/api\/v2\/organizations/)).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(res.data).toEqual(getOrganizationsFixture);
  });

  test('getProducts', async () => {
    fetchMock.get(/api\/v2\/products/, getProductsFixture);

    const client = TremendousClient.createSandbox('1234');
    const res = await client.getProducts();

    expect(fetchMock.called(/api\/v2\/products/)).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(res.data).toEqual(getProductsFixture);
  });

  test('getOrders', async () => {
    fetchMock.get(/api\/v2\/orders/, getOrdersFixture);

    const client = TremendousClient.createSandbox('1234');
    const res = await client.getOrders();

    expect(fetchMock.called(/api\/v2\/orders/)).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(res.data).toEqual(getOrdersFixture);
  });

  test('getOrder', async () => {
    const orderId = 'QABSTARTSFSIO';
    fetchMock.get(/api\/v2\/orders\/QABSTARTSFSIO/, getOrderFixture);

    const client = TremendousClient.createSandbox('1234');
    const res = await client.getOrder(orderId);

    expect(fetchMock.called(/api\/v2\/orders\/QABSTARTSFSIO/)).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(res.data).toEqual(getOrderFixture);
  });

  test('createOrder', async () => {
    fetchMock.post(/api\/v2\/orders/, createOrderFixture);

    const client = TremendousClient.createSandbox('1234');
    const res = await client.createOrder({
      external_id: "OPTIONAL ID FROM CLIENT SYSTEM",
      payment: {
        funding_source_id: "LARFAF2423"
      },
      rewards: [
        {
          value: {
            denomination: 30,
            currency_code: "USD"
          },
          campaign_id: "ABCD23424",
          products: [
            "Optional array of product IDs that overrides Campaign"
          ],
          recipient: {
            name: "Denise Miller",
            email: "denise@sales.com"
          },
          delivery: {
            method: "EMAIL",
            meta: {}
          }
        }
      ]
    });

    expect(fetchMock.called(/api\/v2\/orders/, {
      method: 'POST',
      body: {
        external_id: "OPTIONAL ID FROM CLIENT SYSTEM",
        payment: {
          funding_source_id: "LARFAF2423"
        },
        rewards: [
          {
            value: {
              denomination: 30,
              currency_code: "USD"
            },
            campaign_id: "ABCD23424",
            products: [
              "Optional array of product IDs that overrides Campaign"
            ],
            recipient: {
              name: "Denise Miller",
              email: "denise@sales.com"
            },
            delivery: {
              method: "EMAIL",
              meta: {}
            }
          }
        ]
      },
    })).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(res.data).toEqual(createOrderFixture);
  });

  test('getReward', async () => {
    const rewardId = 'QABSTARTSFSIO';
    fetchMock.get(/api\/v2\/rewards\/QABSTARTSFSIO/, getRewardFixture);

    const client = TremendousClient.createSandbox('1234');
    const res = await client.getReward(rewardId);

    expect(fetchMock.called(/api\/v2\/rewards\/QABSTARTSFSIO/)).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(res.data).toEqual(getRewardFixture);
  });

  test('getFundingSources', async () => {
    fetchMock.get(/api\/v2\/funding_sources/, getFundingSourcesFixture);

    const client = TremendousClient.createSandbox('1234');
    const res = await client.getFundingSources();

    expect(fetchMock.called(/api\/v2\/funding_sources/)).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(res.data).toEqual(getFundingSourcesFixture);
  });

  test('getFundingSource', async () => {
    const fundingSourceId = 'LARFAF2423';
    fetchMock.get(/api\/v2\/funding_sources\/LARFAF2423/, getFundingSourceFixture);

    const client = TremendousClient.createSandbox('1234');
    const res = await client.getFundingSource(fundingSourceId);

    expect(fetchMock.called(/api\/v2\/funding_sources\/LARFAF2423/)).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(res.data).toEqual(getFundingSourceFixture);
  });
});
