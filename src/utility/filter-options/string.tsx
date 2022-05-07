import Constants from '../constant';
const urlLabels = Constants.LABELS.commonUrls;
export const filterStringIs = (
  endpoint: string,
  selectedEntity: string,
  columnName: string,
  selectedOption: string,
  stringInputValue: string,
  theme: any
) => {
  const URI = encodeURIComponent(endpoint);
  const entity = selectedEntity.charAt(0).toLowerCase() + selectedEntity.slice(1);
  window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}&f=${selectedOption}&i=${stringInputValue}&c=${columnName}`;
};
