const hre = require('hardhat');
const { ethers } = require('hardhat');

const DaiABI = require('../src/abi/dai.json');

const daiAddress = '0x6b175474e89094c44da98b954eedeac495271d0f';

async function main() {
  // A guy with some DAI
  const accountToImpersonate = '0x6F6C07d80D0D433ca389D336e6D1feBEA2489264';

  // Fund account[0] from hardhat
  const accountToFund = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266';

  await hre.network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [accountToImpersonate],
  });
  const signer = await ethers.getSigner(accountToImpersonate);

  const daiContract = new ethers.Contract(daiAddress, DaiABI, signer);
  const daiBalance = await daiContract.balanceOf(accountToImpersonate);
  console.log("Guy's DAI balance:", daiBalance / 1e18);

  console.log('Transferring to:', accountToFund);

  await daiContract.connect(signer).transfer(accountToFund, daiBalance);
  const accountBalance = await daiContract.balanceOf(accountToFund);

  console.log('Transfer complete!');
  console.log('Funded account balance:', accountBalance / 1e18);

  const whaleBalanceAfter = await daiContract.balanceOf(accountToImpersonate);
  console.log("Guy's DAI balance now:", whaleBalanceAfter / 1e18);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
