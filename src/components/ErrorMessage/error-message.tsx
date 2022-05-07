import * as React from 'react';
import { ErrorMassageProps } from '../../utility/interface/props';
import './error-message.scss';
import { customMessages } from '../../utility/utility';
import Constants from '../../utility/constant';
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
        <div className="error-conatiner">
          <img className="icon" src="/images/error_icon.gif" alt="" />
          <span className="message">{errorLabels.queryFailedMsg}</span>
        </div>
      )}
    </>
  );
};
export default ErrorMessage;
