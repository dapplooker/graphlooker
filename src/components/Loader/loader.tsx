import React from 'react';
import { CircularProgress, Typography } from '@mui/material';
import './loader.scss';
import Constants from '../../utility/constant';
import { LoaderProps } from '../../utility/interface/props';
const Loader: React.FunctionComponent<LoaderProps> = ({ theme }) => {
  const label = Constants.LABELS.commonLables;
  return (
    <>
      <div className="loader" theme-selector={theme}>
        <CircularProgress className="circular-loader" size={40} thickness={2} />
        <Typography variant="h5" component="h5" className="loader-text">
          {label.LOADING}
        </Typography>
      </div>
    </>
  );
};
export default Loader;
