import { BigNumber, Contract, EventFilter, ethers } from 'ethers';
import { Listener } from '@ethersproject/abstract-provider';
import { useWeb3React } from '@web3-react/core';
import { useMutation, useQuery } from 'react-query';
import daiAbi from 'src/abi/dai.json';
import { useCallback, useMemo, useState } from 'react';
import { uniswapV2RouterAddress } from './useUniswapV2RouterContract';

// @TODO: Probably better to get this from gql.
export const daiAddress = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

const useDaiContract = () => {
  const { active, library, account } = useWeb3React();
  const [approving, setApproving] = useState(false);

  const daiContract = useMemo(
    () => new Contract(daiAddress, daiAbi, library?.getSigner()),
    [daiAddress, daiAbi, library]
  );

  const getBalanceOf = useCallback(async (): Promise<BigNumber | null> => {
    if (account && daiContract) {
      try {
        const balance = await daiContract.balanceOf(account);
        return balance;
      } catch (error) {
        // Production-ready code should use something like Sentry.
        console.error(error);
      }
    }
    return null;
  }, [account, daiContract]);

  const balanceOf = useQuery(['daiBalanceOf', account], getBalanceOf);

  const getAllowance = useCallback(async (): Promise<BigNumber | null> => {
    if (account && daiContract) {
      try {
        const allowedAmount = await daiContract.allowance(
          account,
          uniswapV2RouterAddress
        );
        return allowedAmount;
      } catch (error) {
        // Production-ready code should use something like Sentry.
        console.error(error);
      }
    }
    return null;
  }, [account, daiContract]);

  const allowance = useQuery(['daiAllowance', account], getAllowance);

  const setApprove = useCallback(
    async (amount: BigNumber): Promise<void> => {
      if (amount && account && daiContract) {
        try {
          await daiContract.approve(uniswapV2RouterAddress, amount);
          setApproving(true);
        } catch (error) {
          // Production-ready code should use something like Sentry.
          console.error(error);
        }
      }
    },
    [account, daiContract]
  );

  const approve = useMutation(['daiApprove', account], setApprove);

  const approveEventFilter = useMemo<EventFilter | null>(
    () =>
      daiContract
        ? daiContract.filters.Approval(account, uniswapV2RouterAddress)
        : null,
    [daiContract, account, uniswapV2RouterAddress]
  );

  const handleApproveEvent = useCallback<Listener>(() => {
    allowance.refetch();
    setApproving(false);
  }, []);

  const approveEvent = useMemo(
    () => ({
      subscribe: () => {
        if (active && daiContract && approveEventFilter) {
          daiContract.on(approveEventFilter, handleApproveEvent);
        }
      },
      unsubscribe: () => {
        if (daiContract && approveEventFilter) {
          daiContract.off(approveEventFilter, handleApproveEvent);
        }
      },
    }),
    [active, daiContract, approveEventFilter, handleApproveEvent]
  );

  return {
    daiContract,
    balanceOf,
    allowance,
    approve,
    approveEvent,
    approving,
  };
};

export default useDaiContract;
