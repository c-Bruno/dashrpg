import React from 'react';

import { Grid } from '@mui/material';
import { DICES } from 'common/constants';
import { useModal } from 'common/hooks';
import { Dice } from 'main/components/atoms';
import { DiceRollModal } from 'main/components/molecules';

import * as S from './available-dices.styles';

const AvaliableDices = () => {
  const diceRollModal = useModal(({ close, custom }) => <DiceRollModal amount={custom.amount} handleClose={close} />);

  return (
    <S.CenteredGrid container size={8} spacing={20}>
      <Grid size={12}>
        {Object.values(DICES.WITCH_DICES).map((item) => (
          <Dice
            key={`${item}-dice`}
            image={`/assets/diceImages/${item}.png`}
            onClick={() => diceRollModal.appear({ amount: `1${item}` })}
          />
        ))}
      </Grid>
    </S.CenteredGrid>
  );
};

export default AvaliableDices;
