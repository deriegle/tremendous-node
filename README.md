tremendous
==============

A node.js client library for the [Tremendous API][1].

## Installation

(Not currently hosted on npm)

## Getting started

All API requests require an access token.  A sandbox access token is assigned upon signup through the [Tremendous Sandbox Environment][2]. Once you are ready to move to production, you will be assigned a production access token.

### Authentication

```javascript
const TremendousClient = require('tremendous');

// Sandbox environment
const client = TremendousClient.createSandbox('[SANDBOX_ACCESS_TOKEN]');

// Production environment
const client = TremendousClient.createProduction('[PRODUCTION_ACCESS_TOKEN]');
```

### Orders

See [API documentation][3] for all Order attributes.

```javascript
// Create a new order, specifying your gift options
// as an array of objects.

const res = await client.createOrder({
  payment: {
    funding_source_id: "[FUNDING_SOURCE_ID]",
  },
  reward: {
    value: {
      denomination: 25,
      currency_code: "USD"
    },
    campaign_id: "[CAMPAIGN_ID]",
    delivery: {
      method: "EMAIL",
    },
    recipient: {
      name: "Tremendous Recipient",
      email: "steve@stevens.com"
    }
  }
});


if (res.isSuccess) {
  console.log(res.data);
} else {
  console.log(res.error);
}
```

Get reward

```javascript

const res = await client.getReward("[REWARD_ID]");

if (res.isSuccess) {
  console.log(res.data);
} else {
  console.log(res.error);
}
```

### Funding Sources
Production funding sources must be added through the web dashboard. A sandbox funding source is provided during development.

```javascript
const res = await client.getFundingSources();

if (res.isSuccess) {
  console.log(res.data);
} else {
  console.log(res.error);
}
```

### Products

```javascript
const res = await client.getProducts();

if (res.isSuccess) {
  console.log(res.data);
} else {
  console.log(res.error);
}
```

[1]: https://tremendous.com/docs
[2]: https://testflight.tremendous.com/rewards
[3]: https://tremendous.com/docs
