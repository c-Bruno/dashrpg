import { Box } from "@mui/material";
import { LabeledProgressBar } from "main/components/atoms";

interface StatusBarProps {
  max: number;
  label: string;
  current: number;
  onClick?: () => void;
  primaryColor?: string;
  secondaryColor?: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ max, label, current, onClick, primaryColor, secondaryColor }) => {
  const normalise = (current, max) => ((current - 0) * 100) / (max - 0);

  return (
    <Box sx={{ width: '100%' }}>
      <LabeledProgressBar
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