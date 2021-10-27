# Simple DAI to ETH swap with Uniswap V2

## Intro

Web3 front-end that displays data for a Uniswap V2 trading pair and allows the
user to interact with it.
Requirements:

- User can connect their MetaMask wallet
- App shows the current Uniswap V2 price for the [ETH/DAI](https://etherscan.io/address/0xa478c2975ab1ea89e8196811f51a7b7ade33eb11) trading pair
- App shows user balance for tokens in the trading pair
- User can submit a transaction to 'market buy' (buy at the current market price)
  ETH using a specified amount of DAI
  - Slippage is fixed at 0.5%
- App updates in real-time
- Built using `TypeScript` and `React`
- Not using Uniswap SDK

## Development

Clone the repo and run

```
yarn install
```

I used a mainnet fork to develop locally, follow this steps to get an account
with DAI to play:
In one terminal, run:

```
yarn hardhat:dev
```

This starts a hardhat ethereum node with a mainnet fork. Now, in **other**
terminal, run:

```
yarn hardhat:scripts:fund0
```

This will add a lot of DAI to the first hardhat account. If you want to do this
for another account, just replace the account in `scripts/fundAccount.js#L10`
Now you can run `yarn dev` to start a dev environment in http://localhost:3000/

## Decision process

The intention of this area is to explain my thoughts on code patterns,
technologies and libraries used.

### Libraries

- Typescript.
- React with hooks.
- Hardhat: To create local ethereum node.
- Web3-react and Ethers.js: To interact with Web3 and contracts.
- Next.js: A nice framework on top of React, that simplifies SSR. Useful in a
  project like this for things like Google indexing (show the swap prices when
  people search, for example), SSR (calculate and fetch stuff in the server for
  faster UIs).
- Material-UI: Popular UI library.
- Apollo Client: I love working with GraphQL, this one was used to fetch resources
  from Uniswap's subgraph. I could have used the contract to get this data, but I
  consider that it's good to use this APIs whenever they are mantained and available.
- React Query: A library that allows using promises in react hooks, and manages
  loading states, data fetching and caching. I used this to access contract's data
  easily with hooks.
- Jest for tests.
- React-testing-library: For react components testing.

### Structure

I decided to use [Fractal](https://hackernoon.com/fractal-a-react-app-structure-for-infinite-scale-4dab943092af) for folders structure. I used this before in big projects and works great at scale.
There aren't many components to see this in action, but a good example can be
seen in `src/layouts/MainLayout`.

### Tests

I went for mostly integration tests due to time contraints.
There are two tests that can be used as example (other tests that are missing
could be done with those ideas in mind)

- `src/layouts/mainLayout/AccountDetails.test.tsx`: Shows some Web3 and Contracts
  mocking, which lets us interact with a mocked web3 and contracts without the need
  of a provider.
- `src/components/HomePage.test.tsx`: Shows how to test GraphQL with a mocked
  provider. As well as some basic form interactions.
  I would consider this production-ready after adding tests for the contracts and
  more unit-test and e2e integrations, but I felt most of it was out of scope
  for the time I had for this.
  Good ideas for features/testing (not implemented):
- Validate that value provided can be traded (has allowance and liquidity).
- Validate that the app provides good UI and actions for users without wallet
  connected.
- Full integration: Perform a swap and validate that the balances display
  correctly in the UI.
- Wallet connection/disconnection
- ChainId verification

### Other features considered

- Events + notifications bar: I worked with some events (for the Approve interaction
  in DAI's contract). There should be listeners for all events that are relevant,
  specially when swapping, and display them in a notification area.
- Transactions status / Links to etherscan
- Offline support
- Wallet connection persistance

### Gotchas and TO-DOs

- Not using Uniswap SDK: I would assume this is the preferred way to interact
  with Uniswap Router. I did not use this, so there are some things to consider:
  - Path is hardcoded
  - I ignored the `amountOutMin` attribute (hardcoded as 0)
  - No quotes
- Sleepage: I ignored this, according to [this](https://docs.uniswap.org/protocol/V2/concepts/advanced-topics/pricing) it's defaulted at 0.5%, but don't quote me on that!
- Feedback for the user when a Swap is confirmed and the trasaction is Pending > Confirmed.
- More testing
- There is some abuse in implicit typing, most of it is inferred correctly but
  there could be some more type annotations overall.
- I did not use Env vars, sensible information and some items
  (like addresses, the alchemy endpoint, etc) should not be shared in code
- No git history / commits
- Better error handling

## Production Deployment

As stated above, some items should be moved to ENV vars. Besides that, this
should be ready to be deployed.
Some options are:

- Vercel/Heroku or any other SaaS
- Dokku
- Some VPN
