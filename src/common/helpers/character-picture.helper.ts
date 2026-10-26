import { IMAGE_PLACEHOLDERS } from 'common/constants';

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

const validateImageURL = (url: string) => {
  const allowedDomains = ['discord', 'imgur'];

  const isValidDomain = allowedDomains.some((domain) => url.includes(domain));
  const isDefaultImage = IMAGE_PLACEHOLDERS.some(
    (image) => image.standard_character_picture_url === url || image.injured_character_picture_url === url,
  );

  const isPng = url.endsWith('.png');

  return (isValidDomain || isDefaultImage) && isPng;
};

export default { getCharacterPictureURL, validateImageURL };
