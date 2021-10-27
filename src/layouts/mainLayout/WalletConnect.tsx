import { Alert, Button } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import React from 'react';

export default function WalletConnect() {
  const { activate, deactivate, active, error } = useWeb3React();

  const switchWeb3Connection = () => {
    if (active) {
      deactivate();
    } else {
      activate(new InjectedConnector({ supportedChainIds: [1, 4, 1337] }));
    }
  };

  return (
    <>
      {error && <Alert severity="error">{error.message}</Alert>}
      <Button
        variant="contained"
        sx={{
          float: 'right',
        }}
        onClick={switchWeb3Connection}
      >
        {active ? 'Disconnect' : 'Connect Wallet'}
      </Button>
    </>
  );
}
