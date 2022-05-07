import Constants from '../constant';
const label = Constants.LABELS.commonLables;
const urlLabels = Constants.LABELS.commonUrls;
export const filterNumberIs = (
  endpoint: string,
  selectedEntity: string,
  columnName: string,
  selectedFilter: string,
  firstInputNumber: string,
  secondInputNumber: string,
  theme: any
) => {
  let userInputValue = label.EMPTY;
  if (secondInputNumber === label.EMPTY) {
    userInputValue = firstInputNumber;
  } else {
    userInputValue = firstInputNumber.concat(',', secondInputNumber);
  }
  const URI = encodeURIComponent(endpoint);
  const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
  window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}&f=${selectedFilter}&i=${userInputValue}&c=${columnName}`;
};
