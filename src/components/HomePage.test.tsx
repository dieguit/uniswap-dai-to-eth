import React from 'react';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from 'src/utils/testUtils';
import HomePage from './HomePage';

describe('Home page', () => {
  it('should display the price and reserves correctly', async () => {
    renderWithProviders(<HomePage />);

    // Shows "loading" message initially.
    expect(screen.getByText('Loading price...')).toBeInTheDocument();

    // After 1 tick, mock values should be displayed
    await waitFor(() => {
      expect(
        screen.getByText('Price: 1 ETH ~ 3975.65 DAI')
      ).toBeInTheDocument();

      expect(
        screen.getByText('ETH Reserve: 10816.81792022620681268')
      ).toBeInTheDocument();

      expect(
        screen.getByText('DAI Reserve: 43003881.87058585352793012')
      ).toBeInTheDocument();
    });
  });

  it('should display ETH approximate when entering DAI', async () => {
    renderWithProviders(<HomePage />);

    const daiInput = screen.getByTestId('dai-input');
    userEvent.type(within(daiInput).getByRole('spinbutton'), '3975,6499');

    const ethInput = screen.getByTestId('eth-input');
    await waitFor(() => {
      expect(within(ethInput).getByRole('spinbutton')).toHaveValue(10000);
    });
  });
});
