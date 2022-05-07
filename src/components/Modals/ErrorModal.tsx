import React from 'react';
import Modal from '@mui/material/Modal';
import ErrorMessage from '../ErrorMessage/error-message';
import './modals.scss';
const ErrorModal = (props: any) => {
  const { error } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [open, setOpen] = React.useState(true);
  return (
    <Modal open={open}>
      <div className="modal-wrapper">
        <div className="modal-container">
          <ErrorMessage errorMessage={error} endpoint="" type="" />
        </div>
      </div>
    </Modal>
  );
};
export default ErrorModal;
