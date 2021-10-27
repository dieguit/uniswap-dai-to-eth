import React, { ReactNode } from 'react';
import { screen, waitFor } from '@testing-library/react';
import { utils } from 'ethers';
import { renderWithProviders } from 'src/utils/testUtils';
import AccountDetails from './AccountDetails';

const mockBalance = utils.parseEther('1');
jest.mock('@web3-react/core', () => {
  const originalModule = jest.requireActual('@web3-react/core');

  return {
    __esModule: true,
    ...originalModule,
    useWeb3React: () => ({
      active: true,
      account: '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266',
      library: {
        getBalance: () =>
          new Promise((resolve) => {
            resolve(mockBalance);
          }),
        getSigner: jest.fn(),
      },
    }),
  };
});

const mockDaiBalance = utils.parseEther('3');
jest.mock('ethers', () => {
  const originalModule = jest.requireActual('ethers');

  const mockedDaiContract = class Contract {
    constructor() {}
    balanceOf() {
      return new Promise((resolve) => {
        resolve(mockDaiBalance);
      });
    }
    allowance() {
      return new Promise((resolve) => {
        resolve(mockDaiBalance);
      });
    }
    filters = {
      Approval: jest.fn(),
    };
  };

  return {
    __esModule: true,
    ...originalModule,
    Contract: mockedDaiContract,
  };
});

describe('AccountDetails', () => {
  it('should display account values correctly', async () => {
    renderWithProviders(<AccountDetails />);

    expect(screen.getByText('0xf39f...2266')).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByText('Your ETH Balance: 1.0')).toBeInTheDocument();
      expect(screen.getByText('Your DAI Balance: 3.0')).toBeInTheDocument();
    });
  });
});
