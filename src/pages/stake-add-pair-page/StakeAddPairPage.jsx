import { Box, Typography, withStyles } from '@material-ui/core';
import React, { useState } from 'react';
import PageLayout from '../../components/page-layout/PageLayout';
import TokenCard from '../../components/token-card/TokenCard';
import Button from '../../components/button/Button';
import Checkbox from '../../components/checkbox/Checkbox';
import styles from './styles';

import { cardListData } from '../../storybook-fake-data/storybook-fake-data';

const StakeAddPairPage = ({ classes }) => {
  const [agreement, setAgreement] = useState(true);
  const [cardCheck, setCardCheck] = useState(true);

  const descriptionText1 = 'By clicking button “Add this IOU to swap” I agree with all rulesand conditions of IOUSwap service.';
  const descriptionText2 = 'Read all conditions and rules..';
  const agreementText = 'I carefully read all rules and conditions and agree with all of this.';

  return (
    <PageLayout>
      <Box className={classes.infoSection}>
        <Typography className={classes.title} variant="subtitle1">
          Add IOU to IOUSwap
        </Typography>
        <Box>
          <Typography className={classes.title} variant="subtitle1">
            {descriptionText1}
          </Typography>
          <Typography className={classes.title} variant="subtitle1">
            {descriptionText2}
          </Typography>
        </Box>
      </Box>

      <Box className={classes.selectSection}>
        <Checkbox
          checked={agreement}
          id={agreementText}
          label={
            <Typography className={classes.title} variant="subtitle1">{agreementText}</Typography>
          }
          labelFullWidth
          labelPlacement="start"
          onChange={(evt) => setAgreement(evt.target.checked)}
        />

        <Checkbox
          checked={cardCheck}
          id={`card-${cardListData[0].id}`}
          label={<TokenCard data={cardListData[0]} isFullMode={false} />}
          labelFullWidth
          labelPlacement="start"
          onChange={(evt) => setCardCheck(evt.target.checked)}
        />
      </Box>

      <Box className={classes.actionSection}>
        <Button onClick={() => console.log('button clicked')}>
          Add this IOU to swap
        </Button>
      </Box>
    </PageLayout>
  );
};

export default withStyles(styles, { withTheme: true })(StakeAddPairPage);
