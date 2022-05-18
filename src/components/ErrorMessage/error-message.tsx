import * as React from 'react';
import { ErrorMassageProps } from '../../utility/interface/props';
import './error-message.scss';
import { customMessages } from '../../utility/utility';
import Constants from '../../utility/constant';
import GraphdataTable from '../GraphDataTable/graph-data-table'
const errorLabels = Constants.LABELS.errorComponenet;
const ErrorMessage: React.FunctionComponent<ErrorMassageProps> = ({
  errorMessage,
  endpoint,
  type,
}) => {
  let customMessage: string = customMessages(errorMessage, endpoint);

  return (
    <>
      {type === 'message' ? (
        <div className="error-message">
          <span>{customMessage}</span>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ErrorMessage;
