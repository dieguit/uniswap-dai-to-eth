import { useWeb3React } from '@web3-react/core';
import LoadingButton from '@mui/lab/LoadingButton';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import React, { useEffect } from 'react';
import { utils } from 'ethers';
import { useDaiContract, useUniswapV2RouterContract } from 'src/hooks';

type Props = {
  daiToSell: string;
};
export default function SwapButton({ daiToSell }: Props) {
  const { active } = useWeb3React();
  const { allowance, approve, approving, approveEvent } = useDaiContract();
  const { swapExactTokensForETH } = useUniswapV2RouterContract();

  useEffect(() => {
    approveEvent.subscribe();
    // Unsubscribe on unmount
    return () => {
      approveEvent.unsubscribe();
    };
  }, [approveEvent]);

  // Check if the user has allowed uniswap to spend the amount he wants to spend.
  const amountAllowed = daiToSell
    ? allowance.data?.gte(utils.parseEther(daiToSell))
    : false;

  const renderButton = () => {
    if (!active) {
      return 'Connect wallet first';
    }
    if (allowance.isLoading) {
      return 'Checking allowance...';
    }
    if (approving) {
      return 'Approving...';
    }
    if (amountAllowed) {
      return 'Buy ETH';
    }
    return 'Approve';
  };

  const handleClick = async () => {
    const amount = utils.parseEther(daiToSell);
    // If the user does not have allowance for this trade,
    // we need to as for that before swapping.
    if (!amountAllowed) {
      try {
        await approve.mutate(amount);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await swapExactTokensForETH.mutate(amount);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const disabled = !active || allowance.isLoading || !daiToSell;
  const loading =
    allowance.isLoading || swapExactTokensForETH.isLoading || approving;

  return (
    <LoadingButton
      size="large"
      variant="contained"
      onClick={handleClick}
      disabled={disabled}
      loading={loading}
      startIcon={<SwapVertIcon />}
      loadingPosition="start"
      sx={{
        width: 300,
      }}
    >
      {renderButton()}
    </LoadingButton>
  );
}
