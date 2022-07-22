import * as React from 'react';
import { ErrorMassageProps } from '../../utility/interface/props';
import './error-message.scss';
import { customMessages } from '../../utility/utility';
import Constants from '../../utility/constant';
import { Button} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';

const errorLabels = Constants.LABELS.errorComponenet;
const ErrorMessage: React.FunctionComponent<ErrorMassageProps> = ({
  errorMessage,
  endpoint,
  type,
}) => {
  let customMessage: string = customMessages(errorMessage, endpoint);

  function getBodyForMail() {
    return `${Constants.ERROR_MESSAGES.MAIL_BODY} ${window.location.href}`;
  }
  function getSubjectForMail() {
    return `${Constants.ERROR_MESSAGES.MAIL_SUBJECT}`;
  }
  React.useEffect(() => {
    let mailHrefAttribute = document.getElementById('email-sender');
    if (mailHrefAttribute) {
      mailHrefAttribute.onclick = function () {
        var mailAddress = Constants.CONTACT.EMAIL;
        var linker =
          'mailto:' + mailAddress + '?subject=' + getSubjectForMail() + '&body=' + getBodyForMail();
        mailHrefAttribute?.setAttribute('href', linker);
      };
    }
  }, []);
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
          <Button variant="contained" endIcon={<MailIcon />}>
            <a id="email-sender" target="_blank">
              {Constants.LABELS.commonLables.BUTTON_TEXT_FOR_EMAIL}
            </a>
          </Button>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
