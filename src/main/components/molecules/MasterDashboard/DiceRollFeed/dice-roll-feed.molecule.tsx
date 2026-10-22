import { useState } from 'react';

import { Chip, IconButton, Typography } from '@mui/material';
import { getDiceColor } from 'common/helpers/roll-dice.helper';
import useDiceRollSocket from 'common/hooks/use-dice-roll-socket.hook';

import * as S from './dice-roll-feed.styles';

const MAX_VISIBLE_ROLLS = 8;

interface DiceRollFeedProps {
  characterIds?: number[];
}

const DiceRollFeed = ({ characterIds }: DiceRollFeedProps) => {
  const { rollHistory } = useDiceRollSocket();
  const [dismissedRolls, setDismissedRolls] = useState<Set<string>>(new Set());
  const visibleCharacterIds = characterIds ? new Set(characterIds) : null;

  const visibleRolls = rollHistory
    .filter(
      (roll) => !dismissedRolls.has(roll.id) && (!visibleCharacterIds || visibleCharacterIds.has(roll.character_id)),
    )
    .slice(0, MAX_VISIBLE_ROLLS);

  const dismissRoll = (id: string) => {
    setDismissedRolls((prev) => new Set(prev).add(id));
  };

  if (visibleRolls.length === 0) return null;

  return (
    <S.Wrapper>
      <S.Header>
        <Typography variant='overline' sx={{ lineHeight: 1, letterSpacing: 1 }}>
          Rolagens
        </Typography>
      </S.Header>

      <S.List>
        {visibleRolls.map((roll, index) => (
          <S.Row key={roll.id} style={{ animationDelay: `${index * 0.05}s` }}>
            <S.CharacterName>{roll.character_name}</S.CharacterName>

            <Chip
              label={roll.roll.number}
              color={getDiceColor(roll.roll.description)}
              size='small'
              variant='filled'
              sx={{ fontWeight: 700, minWidth: 40, fontFamily: 'monospace' }}
            />

            <S.Outcome>{roll.roll.description}</S.Outcome>

            <IconButton size='small' onClick={() => dismissRoll(roll.id)} sx={{ p: 0.3, ml: 'auto' }}>
              <Typography variant='caption' sx={{ lineHeight: 1, opacity: 0.5 }}>
                ✕
              </Typography>
            </IconButton>
          </S.Row>
        ))}
      </S.List>
    </S.Wrapper>
  );
};

export default DiceRollFeed;
