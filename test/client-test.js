const TremendousClient = require('../lib/client');
const fetchMock = require('fetch-mock');

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
    fetchMock.get('https://example.com/organizations', {
      organizations: [
        {
          id: "ZQBSTARTSFSTW",
          name: "Apple Inc",
          website: "https://www.apple.com",
          access_token: "[ACCESS_TOKEN]"
        },
        {
          id: "QABSTARTSFSIO",
          name: "Apple Inc - Sales Team",
          website: "https://www.apple.com",
          access_token: "[ACCESS_TOKEN]"
        }
      ]
    });

    const client = new TremendousClient('1234', 'https://example.com');
    const res = await client.getOrganizations();

    expect(fetchMock.called('https://example.com/organizations')).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(await res.json()).toEqual({
      organizations: expect.any(Array),
    });
  });

  test('getProducts', async () => {
    fetchMock.get('https://example.com/products', {
      products: [
        {
          id: "HX4U3DQX6GSA",
          name:"adidas",
          category: "merchant_card",
          countries: [
            {
              abbr: "US"
            },
          ],
          images: [
            {
              src: "https://s3.giftrocket.com/images/adidas"
            }
          ],
          skus:[
            {
              "min":5,
              "max":250
            }
          ]
        }
      ]
    });

    const client = new TremendousClient('1234', 'https://example.com');
    const res = await client.getProducts();

    expect(fetchMock.called('https://example.com/products')).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(await res.json()).toEqual({
      products: expect.any(Array),
    });
  });

  test('getOrders', async () => {
    fetchMock.get('https://example.com/orders', {
      orders: [
        {
          id: "QABSTARTSFSIO",
          external_id: "[ID FROM CLIENT]",
          status: "EXECUTED",
          payment: {
            "subtotal": 25.0,
            "total": 25.5,
            "fees": 0.5
          },
          rewards: [
            {
              id: "DDABSUKSFSTY"
            }
          ]
        }
      ]
    });

    const client = new TremendousClient('1234', 'https://example.com');
    const res = await client.getOrders();

    expect(fetchMock.called('https://example.com/orders')).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(await res.json()).toEqual({
      orders: expect.any(Array),
    });
  });

  test('getOrder', async () => {
    const orderId = 'QABSTARTSFSIO';
    fetchMock.get(`https://example.com/orders/${orderId}`, {
      order: {
        id: orderId,
        external_id: "[ID FROM CLIENT]",
        status: "CART",
        payment: {
          subtotal: 25.0,
          total: 25.5,
          fees: 0.5
        },
        rewards: [
          {
            id: "DDABSUKSFSTY"
          }
        ]
      }
    });

    const client = new TremendousClient('1234', 'https://example.com');
    const res = await client.getOrder(orderId);

    expect(fetchMock.called(`https://example.com/orders/${orderId}`)).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(await res.json()).toEqual({
      order: expect.objectContaining({
        id: orderId,
      })
    });
  });

  test('getReward', async () => {
    const rewardId = 'QABSTARTSFSIO';
    fetchMock.get(`https://example.com/rewards/${rewardId}`, {
      reward: {
        id: rewardId,
        value: {
          denomination: 30,
          currency_code: "USD"
        },
        recipient: {
          name: "Denise Miller",
          email: "denise@sales.com",
        },
        products: ["HX4U3DQX6GSA"],
        delivery: {
          method: "EMAIL",
          status: "SUCCEEDED"
        }
      }
    });

    const client = new TremendousClient('1234', 'https://example.com');
    const res = await client.getReward(rewardId);

    expect(fetchMock.called(`https://example.com/rewards/${rewardId}`)).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(await res.json()).toEqual({
      reward: expect.objectContaining({
        id: rewardId,
      })
    });
  });

  test('getFundingSources', async () => {
    fetchMock.get('https://example.com/funding_sources', {
      funding_sources: [
        {
          id: "GCTHLCMFVYMD",
          method: "balance",
          meta: {
            available_cents: 500000,
            pending_cents: 0
          }
        },
        {
          id: "LARFAF2423",
          method: "ach",
          meta: {
            accountholder_name: "James Bay",
            account_number_mask: "6789",
            bank_name: "Chase"
          }
        }
      ]
    });

    const client = new TremendousClient('1234', 'https://example.com');
    const res = await client.getFundingSources();

    expect(fetchMock.called('https://example.com/funding_sources')).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(await res.json()).toEqual({
      funding_sources: expect.any(Array),
    });
  });

  test('getFundingSource', async () => {
    const fundingSourceId = 'LARFAF2423';
    fetchMock.get(`https://example.com/funding_sources/${fundingSourceId}`, {
      funding_source: {
        id: "LARFAF2423",
        method: "ach",
        meta: {
          accountholder_name: "James Bay",
          account_number_mask: "6789",
          bank_name: "Chase"
        }
      }
    });

    const client = new TremendousClient('1234', 'https://example.com');
    const res = await client.getFundingSource(fundingSourceId);

    expect(fetchMock.called(`https://example.com/funding_sources/${fundingSourceId}`)).toBe(true);
    expect(res.isSuccess).toBe(true);
    expect(res.isError).toBe(false);
    expect(await res.json()).toEqual({
      funding_source: expect.objectContaining({
        id: fundingSourceId,
      })
    });
  });
});
