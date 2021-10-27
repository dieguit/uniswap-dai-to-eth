import { Typography } from '@mui/material';
import { usePairData } from 'src/hooks';

export default function PairPrice() {
  const { pairData, loading } = usePairData(true);

  if (loading) {
    return <Typography>Loading price...</Typography>;
  }

  return (
    <Typography>Price: 1 ETH ~ {pairData?.price.toFixed(2)} DAI</Typography>
  );
}
