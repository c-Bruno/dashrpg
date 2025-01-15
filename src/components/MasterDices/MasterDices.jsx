import React from 'react';

import { Grid } from '@mui/material';
import { Section } from '../../components';
import { useTranslation } from 'react-i18next'; 
import { DiceRollModal } from '../../components/modals';
import useModal from '../../hooks/useModal.hook';
import { CenteredGrid, Dice } from './styles';

import { DICES } from '../../constants/dices';

const MasterDices = () => {
  const { t } = useTranslation(['masterDashboard']); // Translation hook

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
    <Section title={t('dices.title')} image='/assets/diceImages/fire.png'>
      <CenteredGrid item container xs={8} spacing={2}>
        <Grid item xs={12}>
          {Object.values(DICES).map(item => (
            <Dice
              width={80}
              height={80}
              alt={`dice`}
              key={`${item}-dice`}
              src={`/assets/diceImages/${item}.png`}
              onClick={() => diceRollModal.appear({ amount: `1${item}` })}
            />
          ))}
        </Grid>
      </CenteredGrid>
    </Section>
  );
};

export default MasterDices;
