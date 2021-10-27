import { gql } from '@apollo/client';

export const DAI_ETH_PAIR_DATA_QUERY = gql`
  query DaiEthPair {
    pair(id: "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11") {
      id
      token0 {
        id
        symbol
      }
      token1 {
        id
        symbol
      }
      reserve0
      reserve1
      token0Price
    }
  }
`;
