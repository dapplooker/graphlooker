import React from 'react';
import Constants from '../../utility/constant';
import '../NoRecords/noRecords.scss';
const NoRecords = (props: { listOfattributes: object[] }) => {
  const { listOfattributes } = props;
  return (
    <div className="no-record-found">
      <img className="no-record-found" src="/images/no_record_found.gif" alt="No record found" />
      <span>
        {listOfattributes.length === 0
          ? Constants.LABELS.commonLables.NO_ATTRIBUTES
          : Constants.LABELS.commonLables.NO_RECORD}
      </span>
    </div>
  );
};
export default NoRecords;
