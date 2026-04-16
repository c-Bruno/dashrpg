
import { CircularProgress } from '@mui/material';

interface LoaderProps {
  size: number;
  [key: string]: any; // Allow any other props to be passed
}

const Loader = ({ size, ...rest }: LoaderProps) => <CircularProgress color='primary' size={size} {...rest} />;

export default Loader;
