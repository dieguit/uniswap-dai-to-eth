import React, { ReactNode } from 'react';
import { providers } from 'ethers';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { QueryClient, QueryClientProvider } from 'react-query';
import { DAI_ETH_PAIR_DATA_QUERY } from 'src/gql/daiEthPairData';

const queryClient = new QueryClient();

const mockedDaiEthPairQuery = {
  request: {
    query: DAI_ETH_PAIR_DATA_QUERY,
  },
  result: {
    data: {
      pair: {
        id: '0xa478c2975ab1ea89e8196811f51a7b7ade33eb11',
        reserve0: '43003881.87058585352793012',
        reserve1: '10816.81792022620681268',
        token0: {
          __typename: 'Token',
          id: '0x6b175474e89094c44da98b954eedeac495271d0f',
          symbol: 'DAI',
        },
        token0Price: '3975.6499',
        token1: {
          __typename: 'Token',
          id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
          symbol: 'WETH',
        },
      },
    },
  },
};

export const renderWithProviders = (component: ReactNode) => {
  return render(
    <MockedProvider mocks={[mockedDaiEthPairQuery]}>
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    </MockedProvider>
  );
};
