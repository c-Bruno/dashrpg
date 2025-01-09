import React from 'react';

import { withStyles } from '@mui/styles';
import { Grid } from '@mui/material';
import { Section } from '../../components';
import { DiceRollModal } from '../../components/modals';
import useModal from '../../hooks/useModal.hook';

const MasterDices = ({ classes }) => {
  const diceRollModal = useModal(({ close, custom }) => (
    <DiceRollModal
      amount={custom.amount}
      onDiceRoll={rollData => {
        const parsedData = {
          character_id: 0,
          rolls: rollData.map(each => ({
            rolled_number: each.rolled_number,
            max_number: each.max_number,
          })),
        };

        socket.emit('dice_roll', parsedData);
      }}
      handleClose={close}
      characterId={0}
    />
  ));

  return (
    <Section title='Rolagem de dados    ' image='/assets/mastersDice/fire.png'>
      <Grid item container xs={8} spacing={2} className={classes.marginCenter}>
        <Grid item xs={12}>
          <img
            className={classes.dice}
            src='/assets/mastersDice/d4.png'
            alt='D4'
            onClick={() => diceRollModal.appear({ amount: '1d4' })}
          />
          <img
            className={classes.dice}
            src='/assets/mastersDice/d6.png'
            alt='D6'
            onClick={() => diceRollModal.appear({ amount: '1d6' })}
          />
          <img
            className={classes.dice}
            src='/assets/mastersDice/d8.png'
            alt='D8'
            onClick={() => diceRollModal.appear({ amount: '1d8' })}
          />
        </Grid>

        <Grid item xs={12}>
          <img
            className={classes.dice}
            src='/assets/mastersDice/d10.png'
            alt='D10'
            onClick={() => diceRollModal.appear({ amount: '1d10' })}
          />
          <img
            className={classes.dice}
            src='/assets/mastersDice/d12.png'
            alt='D12'
            onClick={() => diceRollModal.appear({ amount: '1d12' })}
          />
          <img
            className={classes.dice}
            src='/assets/mastersDice/d20.png'
            alt='D20'
            onClick={() => diceRollModal.appear({ amount: '1d20' })}
          />
        </Grid>
      </Grid>
    </Section>
  );
};

const styles = theme => ({
  marginCenter: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  dice: {
    width: '33.33%',
    cursor: 'pointer',
  },
});

export default withStyles(styles)(MasterDices);
