const getCharacterPictureURL = (character: any): string => {
  if (!character) {
    return null;
  }

  if (character.standard_character_picture_url && character.injured_character_picture_url) {
    if (character.current_hit_points > character.max_hit_points / 2) {
      return character.standard_character_picture_url;
    } else {
      return character.injured_character_picture_url;
    }
  } else {
    return `/assets/placeholders/warrior.placeholder.png`;
  }
};

export default getCharacterPictureURL;
