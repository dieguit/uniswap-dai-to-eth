import { useQuery } from '@apollo/client';

import { DAI_ETH_PAIR_DATA_QUERY } from 'src/gql/daiEthPairData';
import useInterval from './useInterval';

type Token = {
  id: string;
  symbol: string;
};

type PairData = {
  pair: {
    id: string;
    token0: Token;
    token1: Token;
    reserve0: string;
    reserve1: string;
    token0Price: string;
  };
};

const usePairData = (enablePolling = false) => {
  const { data, loading, refetch } = useQuery<PairData>(
    DAI_ETH_PAIR_DATA_QUERY
  );

  useInterval(() => {
    if (enablePolling) {
      refetch();
    }
  }, 5000);

  const price = data?.pair?.token0Price
    ? Number.parseFloat(data.pair.token0Price)
    : 0;

  return {
    pairData: data
      ? {
          ...data.pair,
          price,
        }
      : null,
    loading,
  };
};

export default usePairData;
