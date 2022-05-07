import React from 'react';
import ErrorModal from '../Modals/ErrorModal';
import DownloadModal from '../Modals/DownloadModal';
const DownloadPage: React.FunctionComponent<any> = ({ sortedDataState, downloadRef, error }) => {
  return (
    <>
      {error && sortedDataState.length <= 0 ? (
        <ErrorModal error={error} />
      ) : (
        <DownloadModal sortedDataState={sortedDataState} downloadRef={downloadRef} />
      )}
    </>
  );
};
export default DownloadPage;
