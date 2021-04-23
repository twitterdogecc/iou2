import React from 'react';
import TokenCardsList from './TokenCardsList';

export default {
  title: 'Components/TokenCardsList',
  component: TokenCardsList,
  argTypes: {
    onClick: {
      action: 'clicked',
    },
  },
  args: {
    title: 'Select IOU to payoff',
  },
};

const Template = (args) => <TokenCardsList {...args} />;

export const Base = Template.bind({});
Base.args = {
  data: [
    {
      id: 'id1',
      title: 'SmbdIOUtoken1',
      count: 1,
      description: 'consulting in blockchain',
      keys: 'blockchain, consulting',
      address: '0x12345678ABCDF123456',
      minted: 10,
      payed: 7,
      rating: 80,
      units: 'hours',
    },
    {
      id: 'id2',
      title: 'SmbdIOUtoken1',
      count: 1,
      description: 'consulting in blockchain',
      keys: 'blockchain, consulting',
      address: '0x12345678ABCDF123456',
      minted: 15,
      payed: 8,
      rating: 60,
      units: 'hours',
    },
    {
      id: 'id3',
      title: 'SmbdIOUtoken1',
      count: 1,
      description: 'consulting in blockchain',
      keys: 'blockchain, consulting',
      address: '0x12345678ABCDF123456',
      minted: 15,
      payed: 8,
      rating: 60,
      units: 'hours',
    },
  ],
};