import React from 'react';
import Modal from '@mui/material/Modal';
import Constants from '../../utility/constant';
import './modals.scss';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import 'animate.css';
import swal from 'sweetalert';
import { useEffect } from 'react';
const DownloadModal = (props: any) => {
  const { sortedDataState, downloadRef } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = React.useState(true);
  const [firstrender, setfirstrender] = React.useState(false)
  const exportLabels = Constants.LABELS.exportLabels;
  useEffect(() => {
    swal({
      title: "Ready for download",
      text: "Your csv file is getting downloaded in the background",
      icon: "success",
    });
    setfirstrender(true);
  }, [firstrender])
  return (
    <Modal open={open}>
      <div className="modal-wrapper">
        <div className="modal-container">
          <h2 className="download-heading">
            {downloadRef === false ?
              <div className="animate__animated animate__fadeInDown animate__delay-9s"> <Alert className="success" severity="success">
                <AlertTitle><strong>CSV Download completed successfully </strong></AlertTitle>
              </Alert></div>
              :
              <div >
                <div className='modalshow'>{exportLabels.DWNLD_SOON}
                  <div className="dot dot1"></div>
                  <div className="dot dot2"></div>
                  <div className="dot dot3"></div>
                </div>
              </div>
            }
          </h2>
          {downloadRef === false ? (
            <figure className="download-state">
              <img
                // src={Constants.LABELS.imagePaths.FIREWORKS}
                src="/images/firework-outline.gif"
                alt={Constants.LABELS.commonLables.DOWNLOADING}
                width={150}
                height={150}
              />
            </figure>
          ) : (
            <figure className="download-state">
              <img
                // src={Constants.LABELS.imagePaths.DOWNLOAD}
                src="/images/document-outline.gif"
                alt={Constants.LABELS.commonLables.DOWNLOADING}
                width={150}
                height={150}
              />
            </figure>
          )}
          {downloadRef && (
            <h3 className="records-msg">
              {exportLabels.HOLD_MSG}
              <b>
                {' '}
                {sortedDataState.length} {exportLabels.RECORDS_MSG}
              </b>
            </h3>
          )}
          {!(downloadRef === false) && (
            <figure className="warning-container">
              <img
                // src={Constants.LABELS.imagePaths.ERROR}
                src="/images/error-outline.gif"
                alt={Constants.LABELS.commonLables.DOWNLOADING}
                width={60}
                height={60}
              />
              <figcaption className="msg">{exportLabels.CLOSE_TAB_MSG}</figcaption>
            </figure>
          )}
        </div>
      </div>
    </Modal>
  );
};
export default DownloadModal;
