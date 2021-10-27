import { BigNumber } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import { useCallback, useMemo } from 'react';
import { useQuery } from 'react-query';

const useAccountData = () => {
  const { library, account } = useWeb3React();

  const getEthBalance = useCallback(async (): Promise<BigNumber | null> => {
    if (account) {
      const balance = await library.getBalance(account);
      return balance;
    }
    return null;
  }, [account]);

  const ethBalance = useQuery(['accountEthBalance', account], getEthBalance);

  return {
    ethBalance,
  };
};

export default useAccountData;
