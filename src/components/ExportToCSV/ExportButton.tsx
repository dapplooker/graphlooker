import { useLocation, withRouter } from 'react-router-dom';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Tooltip } from '@mui/material';
import Constants from '../../utility/constant';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import * as React from 'react';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import swal from 'sweetalert';
const ExportButton: React.FunctionComponent<any> = ({ rows }) => {
  let location = useLocation();
  const label = Constants.LABELS.commonLables;
  function clickHandler() {
    window.open(`${location.pathname}${location.search}&v=download`);
  }
  return (
    <>
      <Tooltip title={label.DOWNLOAD}>
        <button onClick={clickHandler} className="btn-exportcsv" disabled={rows.length === 0}>
          <FileDownloadIcon />
        </button>
      </Tooltip>
    </>
  );
};
export default withRouter(ExportButton);
