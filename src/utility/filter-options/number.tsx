import Constants from '../constant';
import Utility from '../utility';

const label = Constants.LABELS.commonLables;

const urlLabels = Constants.LABELS.commonUrls;
export const filterNumberIs = (
  endpoint: string,
  selectedEntity: string,
  columnName: string,
  selectedFilter: string,
  firstInputNumber: string,
  secondInputNumber: string,
  theme: any,
  listOFFiltersInStringify: string
) => {
  let userInputValue: any;
  if (secondInputNumber === label.EMPTY) {
    userInputValue = firstInputNumber;
  } else {
    userInputValue = [];
    userInputValue.push(firstInputNumber);
    userInputValue.push(secondInputNumber);
  }

  const URI = encodeURIComponent(endpoint);
  const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
  let filtersInStringify = Utility.getAllFilters(
    selectedFilter,
    columnName,
    userInputValue,
    listOFFiltersInStringify
  );
  window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}&filterObj=${filtersInStringify}`;
};
