import { IMAGE_PLACEHOLDERS } from 'common/constants';

const validateImageURL = (url: string) => {
  const allowedDomains = ['discord', 'imgur'];

  const isValidDomain = allowedDomains.some((domain) => url.includes(domain));
  const isDefaultImage = IMAGE_PLACEHOLDERS.some(
    (image) => image.standard_character_picture_url === url || image.injured_character_picture_url === url,
  );

  const isPng = url.endsWith('.png');

  return (isValidDomain || isDefaultImage) && isPng;
};

export default validateImageURL;
