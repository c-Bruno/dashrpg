import { Box, LinearProgress, styled, Typography } from '@mui/material';

const StyledLinearProgress = styled(LinearProgress)`
  &.secondary {
    background-color: ${props => props.secondaryColor || '#eaeaea'};
  }

  & .MuiLinearProgress-bar {
    background-color: ${props => props.primaryColor || '#0070f3'};
  }
`;

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <StyledLinearProgress
          variant='determinate'
          value={props.value}
          primaryColor={props.primaryColor}
          secondaryColor={props.secondaryColor}
          onClick={props.onClick}
          classes={{
            root: 'secondary',
          }}
          style={{ height: '30px', borderRadius: '4px', cursor: 'pointer' }}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant='body1' color='text.secondary' style={{ userSelect: 'none' }}>
          {props.label}
        </Typography>
      </Box>
    </Box>
  );
}

const StatusBar = ({ max, label, current, onClick, primaryColor, secondaryColor }) => {
  const normalise = (current, max) => ((current - 0) * 100) / (max - 0);

  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel
        value={normalise(current, max)}
        label={label}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        onClick={onClick}
      />
    </Box>
  );
};

export default StatusBar;
