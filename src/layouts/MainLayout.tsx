import React from 'react';
import { Box, Card, CardContent, Container } from '@mui/material';
import AccountDetails from './mainLayout/AccountDetails';
import WalletConnect from './mainLayout/WalletConnect';
import Logo from 'src/components/Logo';

type Props = {
  children: React.ReactNode;
};
export default function MainLayout({ children }: Props) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgb(234, 238, 243)',
      }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Logo />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <AccountDetails />
          <WalletConnect />
        </Box>
      </Box>
      <Container
        sx={{
          flex: 1,
        }}
      >
        <Box
          sx={{
            display: 'grid',
            placeItems: 'center',
            height: '100%',
          }}
        >
          <Card
            sx={{
              minHeight: 300,
              width: 600,
            }}
          >
            <CardContent>{children}</CardContent>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}
