import { Avatar, Box, CardHeader, Typography, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import PageLayout from '../../components/page-layout/PageLayout';
import TokenCard from '../../components/token-card/TokenCard';
import Button from '../../components/button/Button';
import Input from '../../components/input/Input';
import QRIcon from '../../assets/img/QRico.png';
import styles from './styles';

// ------------------------------------------------------------
const fakeData = {
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
};
// ------------------------------------------------------------

const MintSelectReceiverPage = ({ classes }) => {
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');

  const handleQRButtonClick = () => console.log('button clicked');
  const handleButtonClick = () => console.log('button clicked');

  return (
    <PageLayout>
      <Box className={classes.selectSection}>
        <Typography className={classes.title} variant="subtitle1">
          Give your IOU:
        </Typography>
        <TokenCard data={fakeData} />
      </Box>

      <Box className={classes.QRSection}>
        <CardHeader
          className={classes.QRSection_text}
          title="To..."
          subheader="(paste address of receiver or scan their QR code)"
        />
        <Button onClick={handleQRButtonClick}>
          <Avatar alt="QR" className={classes.qr_ico} src={QRIcon} variant="square" />
        </Button>
      </Box>

      <Box className={classes.dataSection}>
        <Input
          id={'EthereumAddress0x...'}
          label={'Ethereum address 0x...'}
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
        <Box className={classes.numberInput}>
          <Input
            id={'NumberOfGivenIOUs'}
            label={'Number of given IOUs'}
            onChange={(e) => setNumber(e.target.value)}
            type="number"
            value={number}
          />
          <Typography>Units: hours</Typography>
        </Box>
      </Box>
      <Box className={classes.actionSection}>
        <Button onClick={handleButtonClick}>send IOU</Button>
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(MintSelectReceiverPage);