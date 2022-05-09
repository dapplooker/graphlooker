import React from 'react';
import Modal from '@mui/material/Modal';
import Constants from '../../utility/constant';
import './modals.scss';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DownloadModal = (props: any) => {
  const { sortedDataState, downloadRef } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = React.useState(true);
  const exportLabels = Constants.LABELS.exportLabels;
  useEffect(() => {
    toast.success('Download completed successully ', {
      position: "top-center",
      autoClose: false,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: 0,
    });
  }, [])
  return (
    <Modal open={open}>
      <div className="modal-wrapper">
        <div className="modal-container">
          <h2 className="download-heading">
            {downloadRef === false ?
              <div className='download-complete'><Alert variant="filled" className='alert-message' severity="success">
                {exportLabels.SUCCESSFUL_DOWNLOAD}
              </Alert></div>
              : <div className='download-soon'>
                <p>{exportLabels.PROGRESS_MSSG}</p>
              </div>}
          </h2>
          {downloadRef === false ? (
            ""
          ) : (
            <figure className="download-state">
              <img
                src="/images/document-outline.gif"
                alt={Constants.LABELS.commonLables.DOWNLOADING}
                width={50}
                height={50}
              />
            </figure>
          )}
          {downloadRef && (
            <h3 className="records-msg">
              {exportLabels.HOLD_MSG}
              <b>
                {' '}
                <div></div>
                {sortedDataState.length} {exportLabels.RECORDS_MSG}
              </b>
            </h3>
          )}
          {!(downloadRef === false) && (
            <>
              <figure className="warning-container">
                <Stack sx={{ width: '150%' }} spacing={9}>
                  <Alert severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    {exportLabels.NO_DOWNLOAD} <br /><strong>{exportLabels.STOP_DOWNLOAD}</strong>
                  </Alert>
                </Stack>
              </figure>
              <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                <LinearProgress color="success" />
              </Stack>
            </>
          )}
        </div>
      </div >
    </Modal >
  );
};

export default DownloadModal;
