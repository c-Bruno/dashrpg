import { ToastContainer, toast } from 'react-toastify';

import {   Grid, TextField   } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

import { useModal } from 'common/hooks';
import { Dice } from 'main/components/atoms';
import { DiceRollModal, InfoModal } from 'main/components/molecules';

import * as S from './rollable-attribute.styles';

interface RollableAttributeProps {
  data: any;
  image: string;
  onInput: (value: string) => void;
  onValueChange: (value: string) => void;
}

const RollableAttribute = ({ data, image, onInput, onValueChange }: RollableAttributeProps) => {
  const infoModal = useModal(({ close }) => (
    <InfoModal title={data.name} text={data.description} handleClose={close} />
  ));

  const diceRollModal = useModal(({ close }) => (
    <DiceRollModal
      amount={'1d20'}
      atribute={data.name}
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

  const handleDiceClick = (data) => {
    data.value ? diceRollModal.appear() : toast.error('Primeiro preencha o valor do atributo');
  };

  return (
    <div>
      <Grid container sx={{ justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        {/* Imagem do dado para rolagem no atributo */}
        <Grid>
          <Dice width={40} height={40} image={image} altText='Dice roll' onClick={() => handleDiceClick(data)} />
        </Grid>

        {/* Nome do atributo com acionamento para o modal de informação */}
        <S.AttributeName>
          <S.AttributeTextName onClick={() => infoModal.appear()}>{data.name}</S.AttributeTextName>
        </S.AttributeName>

        {/* Text para digitar o valor do atributo */}
        <Grid>
          <TextField
            value={data.value ?? ''}
            variant='standard'
            fullWidth
            slotProps={{
              htmlInput: {
                style: {
                  padding: 8,
                  textAlign: 'center',
                },
              },
            }}
            onBlur={(event) => onValueChange(event.target.value)}
            onChange={(event) => onInput(event.target.value)}
          />
        </Grid>
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default RollableAttribute;
