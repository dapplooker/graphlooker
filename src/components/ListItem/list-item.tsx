import React from 'react';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useSelector } from 'react-redux';
import './list-item.scss';
import { ListItemProps } from './../../utility/interface/props';
import TableChartIcon from '@mui/icons-material/TableChart';
import { EndpointState, EntityState } from '../../utility/redux/state';
import Constants from '../../utility/constant';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import queryString from 'query-string';
const ListItem: React.FunctionComponent<ListItemProps & RouteComponentProps<any>> = ({
  entity,
  location,
}) => {
  const parsed = queryString.parse(location.search);
  let theme = parsed.th;
  let selectedEntity: string;
  selectedEntity = useSelector((state: EntityState) => state.selectedEntity.entity);
  const endpoint = useSelector((state: EndpointState) => state.graphEndpoint.endpoint);
  const urlLabels = Constants.LABELS.commonUrls;
  const handleEntityChange = (entity: string) => {
    const URI = encodeURIComponent(endpoint);
    window.location.href = `${urlLabels.BASE_URL}uri=${URI}&e=${entity}&th=${theme}`;
  };
  return (
    <React.Fragment>
      <div style={{ textDecoration: 'none' }} className="links">
        <ListItemButton
          className={
            selectedEntity === entity
              ? `list-item-selected selected-background`
              : `list-item margin-halfrem`
          }
          onClick={() => handleEntityChange(entity)}
        >
          <TableChartIcon className="entity-logo"></TableChartIcon>
          <div style={{ display: 'flex', alignItems: 'center' }} className="entity-name">
            <ListItemText className="list-item-text" primary={entity} />
          </div>
        </ListItemButton>
        <Divider sx={{ borderBottomWidth: 0.01 }} color="#00A1FF" />
      </div>
    </React.Fragment>
  );
};
export default withRouter(ListItem);
