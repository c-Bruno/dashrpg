import React from 'react';

import { Grid, TextField } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import useModal from '../../../../hooks/useModal.hook';
import { DiceRollModal, InfoModal } from '../../../../components/modals';
  
import * as S from './rollable-attribute.styles';

interface RollableAttributeProps {
  data: any;
  image: string;
  onInput: (value: string) => void;
  onValueChange: (value: string) => void;
  avaliableSkills: any; 
};

const RollableAttribute: React.FC<RollableAttributeProps> = ({ data, image, onInput, onValueChange, avaliableSkills }) => {
  const infoModal = useModal(({ close }) => (
    <InfoModal title={data.name} text={data.description} handleClose={close} />
  ));

  const diceRollModal = useModal(({ close }) => (
    <DiceRollModal
      amount={'1d20'}
      atribute={data.name}
      valueAtribute={data.value}
      skillAttibute={data.skill_id}
      avaliableSkills={avaliableSkills}
      // onDiceRoll={rollData => {
      //   const parsedData = {
      //     character_id: character.id,
      //     rolls: rollData.map(each => ({
      //       rolled_number: each.rolled_number,
      //       max_number: each.max_number,
      //     })),
      //   };

      //   socket.emit('dice_roll', parsedData);
      // }}
      handleClose={close}
    />
  ));

  return (
    <div>
      <Grid container direction='column' alignItems='center' justifyContent='center'>
        {/* Imagem do dado para rolagem no atributo */}
        <Grid item>
          <S.Dice
            width={40}
            height={40}
            src={image}
            alt='Dice roll'
            onClick={() => {
              data.value
                ? diceRollModal.appear()
                : toast.error('Primeiro preencha o valor do atributo');
            }}
          />
        </Grid>

        {/* Nome do atributo com acionamento para o modal de informação */}
        <S.AttributeName item>
          <S.AttributeTextName onClick={() => infoModal.appear()}>{data.name}</S.AttributeTextName>
        </S.AttributeName>

        {/* Text para digitar o valor do atributo */}
        <Grid>
          <TextField
            value={data.value ?? ''}
            variant='standard'
            fullWidth
            inputProps={{
              style: {
                padding: 8,
                textAlign: 'center',
              },
            }}
            onBlur={event => onValueChange(event.target.value)}
            onChange={event => onInput(event.target.value)}
          />
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default RollableAttribute;
