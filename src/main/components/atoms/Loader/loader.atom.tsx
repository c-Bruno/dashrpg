import React from 'react';

import { CircularProgress } from '@mui/material';

interface LoaderProps {
  size: number;
  [key: string]: any; // Allow any other props to be passed
}

const Loader: React.FC<LoaderProps> = ({ size, ...rest }) => <CircularProgress color='primary' size={size} {...rest} />;

export default Loader;
