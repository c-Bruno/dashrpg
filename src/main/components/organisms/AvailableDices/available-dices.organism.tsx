import React from 'react';

import { Grid } from '@mui/material';
import { DICES } from 'common/constants';
import { useModal } from 'common/hooks';
import { DiceRollModal, Section } from 'main/components/molecules';

import * as S from './available-dices.styles';

const AvaliableDices = () => {
  const diceRollModal = useModal(({ close, custom }) => <DiceRollModal amount={custom.amount} handleClose={close} />);

  return (
    <Section title='Dados' image='/assets/diceImages/fire.png'>
      <S.CenteredGrid item container xs={8} spacing={2}>
        <Grid item xs={12}>
          {Object.values(DICES).map((item) => (
            <S.Dice
              width={80}
              height={80}
              alt={`dice`}
              key={`${item}-dice`}
              src={`/assets/diceImages/${item}.png`}
              onClick={() => diceRollModal.appear({ amount: `1${item}` })}
            />
          ))}
        </Grid>
      </S.CenteredGrid>
    </Section>
  );
};

export default AvaliableDices;
