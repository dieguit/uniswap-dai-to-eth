import { useCallback, useMemo } from 'react';
import { BigNumber, Contract } from 'ethers';
import { useWeb3React } from '@web3-react/core';
import uniswapRouterAbi from 'src/abi/uniswapV2Router.json';
import { useMutation, useQuery } from 'react-query';
import { daiAddress } from './useDaiContract';

export const uniswapV2RouterAddress =
  '0x7a250d5630b4cf539739df2c5dacb4c659f2488d';

const wethAddress = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2';

const useUniswapV2RouterContract = () => {
  const { active, library, account } = useWeb3React();

  const uniswapRouterContract = useMemo(
    () =>
      new Contract(
        uniswapV2RouterAddress,
        uniswapRouterAbi,
        library?.getSigner()
      ),
    [uniswapV2RouterAddress, uniswapRouterAbi, library]
  );

  const doSwapExactTokensForETH = useCallback(
    async (amount: BigNumber): Promise<BigNumber | null> => {
      if (account && uniswapRouterContract) {
        try {
          await uniswapRouterContract.swapExactTokensForETH(
            amount,
            BigNumber.from(0),
            [daiAddress, wethAddress],
            account,
            Date.now() + 1000 * 60 * 10
          );
        } catch (error) {
          // Production-ready code should use something like Sentry.
          console.error(error);
        }
      }
      return null;
    },
    [account, uniswapRouterContract]
  );

  const swapExactTokensForETH = useMutation(
    ['swapExactTokensForETH', account],
    doSwapExactTokensForETH
  );

  return {
    swapExactTokensForETH,
  };
};

export default useUniswapV2RouterContract;
