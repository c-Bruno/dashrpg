import { StatusBarEnum } from 'common/enums';
import { characterPicture } from 'common/helpers';
import { Character } from 'common/types';
import { Avatar, RuleIcon } from 'design-system/ui';
import { CharacterStatusBar } from 'features/character-status';

import * as S from './stats-section.styles';

type StatsSectionProps = {
  character: Character;
};

const StatsSection = ({ character }: StatsSectionProps) => {
  const pictureUrl = characterPicture.getCharacterPictureURL(character);
  const identityDetails = [
    { kind: 'gender', icon: 'gender', label: character.gender },
    { kind: 'age', icon: 'calendar', label: character.age != null ? `${character.age} anos` : undefined },
    { kind: 'birthplace', icon: 'pin', label: character.birthplace },
    { kind: 'player', icon: 'sheet', label: character.player_name ? `Jogador: ${character.player_name}` : undefined },
  ] as const;

  return (
    <S.OverviewRow>
      <Avatar src={pictureUrl} size={168} variant='square' avatarFrame />

      <S.IdentitySection>
        <S.SheetName>{character.name.charAt(0).toUpperCase() + character.name.slice(1)}</S.SheetName>
        {character.occupation && <S.SheetOccupation>{character.occupation}</S.SheetOccupation>}
        <S.IdentityDetails>
          {identityDetails
            .filter((detail) => detail.label)
            .map((detail) => (
              <S.IdentityDetail key={detail.kind} data-kind={detail.kind}>
                <RuleIcon iconKey={detail.icon} size={18} />
                {detail.label}
              </S.IdentityDetail>
            ))}
        </S.IdentityDetails>
      </S.IdentitySection>

      <S.StatsSection>
        <CharacterStatusBar character={character} icon={<RuleIcon iconKey='heart' size={24} />} withIcon compact />
        <CharacterStatusBar
          character={character}
          variant={StatusBarEnum.Sanity}
          icon={<RuleIcon iconKey='brain' size={24} />}
          withIcon
          compact
        />
      </S.StatsSection>
    </S.OverviewRow>
  );
};

export default StatsSection;
