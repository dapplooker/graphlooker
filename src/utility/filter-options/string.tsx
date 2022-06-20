import Constants from '../constant';
import Utility from '../utility';

const urlLabels = Constants.LABELS.commonUrls;
export const filterStringIs = (
  endpoint: string,
  selectedEntity: string,
  columnName: string,
  selectedFilter: string,
  stringInputValue: string,
  theme: any,
  listOFFiltersInStringify: string
) => {
  const URI = encodeURIComponent(endpoint);
  const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
  let filtersInStringify = Utility.getAllFilters(
    selectedFilter,
    columnName,
    stringInputValue,
    listOFFiltersInStringify
  );
  window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}&filterObj=${filtersInStringify}`;
};
