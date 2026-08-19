import { ToastContainer, toast } from 'react-toastify';

import { Grid, TextField } from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';

import { useModal } from 'common/hooks';
import { Dice } from 'main/components/atoms';
import { DiceRollModal, InfoModal } from 'main/components/molecules';

import * as S from './rollable-attribute.styles';

interface RollableAttributeProps {
  data: any;
  image?: string;
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
      attribute={data.name}
      attributeValue={Number(data.value)}
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
    <S.Container>
      <Grid container sx={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
        <Dice width={40} height={40} image={image} onClick={() => handleDiceClick(data)} />
        <S.AttributeTextName onClick={() => infoModal.appear()}>{data.name}</S.AttributeTextName>

        <TextField
          value={data.value ?? ''}
          variant='standard'
          slotProps={{ htmlInput: { style: { padding: 8, textAlign: 'center' } } }}
          onBlur={(event) => onValueChange(event.target.value)}
          onChange={(event) => onInput(event.target.value)}
        />
      </Grid>
      <ToastContainer />
    </S.Container>
  );
};

export default RollableAttribute;
