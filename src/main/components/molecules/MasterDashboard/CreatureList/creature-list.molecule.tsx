import { Grid } from '@mui/material';

const CreatureList = () => {
  return (
    <Grid container spacing={2} marginTop={30} alignItems='center' justifyContent='center'>
      <Grid item>
        <a target='_blank' rel='noreferrer' href='https://www.mythrillfiction.com/the-dark-rider'>
          <div className='card'>
            <div className='wrapper'>
              <img
                className='cover-image'
                src='https://ggayane.github.io/css-experiments/cards/dark_rider-cover.jpg'
                alt='Dark Rider Cover'
              />
            </div>
            <img
              className='title'
              src='https://ggayane.github.io/css-experiments/cards/dark_rider-title.png'
              alt='Dark Rider Title'
            />
            <img
              className='character'
              src='https://ggayane.github.io/css-experiments/cards/dark_rider-character.webp'
              alt='Dark Rider Character'
            />
          </div>
        </a>
      </Grid>

      <Grid item>
        <a target='_blank' rel='noreferrer' href='https://www.mythrillfiction.com/force-mage'>
          <div className='card'>
            <div className='wrapper'>
              <img
                className='cover-image'
                src='https://ggayane.github.io/css-experiments/cards/force_mage-cover.jpg'
                alt='Force Mage Cover'
              />
            </div>
            <img
              className='title'
              src='https://ggayane.github.io/css-experiments/cards/force_mage-title.png'
              alt='Force Mage Title'
            />
            <img
              className='character'
              src='https://ggayane.github.io/css-experiments/cards/force_mage-character.webp'
              alt='Force Mage Character'
            />
          </div>
        </a>
      </Grid>
    </Grid>
  );
};

export default CreatureList;
