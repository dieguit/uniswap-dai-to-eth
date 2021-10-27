import React from 'react';
import { trimString } from 'src/utils';
import { Chip } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { useDaiContract, useAccountData } from 'src/hooks';
import { ethers } from 'ethers';

export default function AccountDetails() {
  const { active, account } = useWeb3React();

  const trimmedAccount = trimString(account);

  const { balanceOf } = useDaiContract();

  const accountDaiBalance = balanceOf.data
    ? ethers.utils.formatEther(balanceOf.data)
    : null;

  const { ethBalance } = useAccountData();

  const accountEthBalance = ethBalance.data
    ? ethers.utils.formatEther(ethBalance.data)
    : null;
  if (active) {
    return (
      <>
        <Chip label={`Your DAI Balance: ${accountDaiBalance}`} />
        <Chip label={`Your ETH Balance: ${accountEthBalance}`} />
        <Chip label={trimmedAccount} />
      </>
    );
  }
  return null;
}
