import type { NextPage } from 'next';
import {
  Grid,
  Box,
  Typography,
  TextField,
  InputAdornment,
} from '@mui/material';
import ArrowDownIcon from '@mui/icons-material/ArrowDownward';
import React, { useCallback, useEffect, useState } from 'react';
import PairPrice from 'src/components/PairPrice';
import { usePairData } from 'src/hooks';
import SwapButton from 'src/components/SwapButton';

const Home: NextPage = () => {
  const { pairData, loading } = usePairData(true);
  const [daiToSell, setDaiToSell] = useState('');

  const ethValue = loading
    ? 'Loading...'
    : (Number.parseFloat(daiToSell) || 0) / (pairData?.price || 1);

  return (
    <div>
      <Typography variant="h2">Swap DAI to ETH</Typography>
      <Grid container sx={{ mt: 3 }}>
        <Grid item md={6} xs={12}>
          <TextField
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">DAI</InputAdornment>
              ),
            }}
            value={daiToSell}
            onChange={(e) => {
              setDaiToSell(e.target.value || '');
            }}
            fullWidth
            data-testid="dai-input"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          sx={{
            alignSelf: 'center',
            pl: 2,
          }}
        >
          <Typography>DAI Reserve: {pairData?.reserve0}</Typography>
        </Grid>
        <Grid item md={6} xs={12}>
          <Box
            sx={{
              width: '100%',
              height: 55,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <ArrowDownIcon />
          </Box>
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          sx={{
            alignSelf: 'center',
            pl: 2,
          }}
        >
          <PairPrice />
        </Grid>
        <Grid item md={6} xs={12}>
          <TextField
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">ETH</InputAdornment>
              ),
            }}
            value={ethValue}
            disabled
            fullWidth
            data-testid="eth-input"
          />
        </Grid>
        <Grid
          item
          md={6}
          xs={12}
          sx={{
            alignSelf: 'center',
            pl: 2,
          }}
        >
          <Typography>ETH Reserve: {pairData?.reserve1}</Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            alignSelf: 'center',
            pt: 3,
            textAlign: 'center',
          }}
        >
          <SwapButton daiToSell={daiToSell} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
