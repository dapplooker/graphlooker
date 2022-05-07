import * as React from 'react';
import './graph-data.scss';
import { useQuery } from '@apollo/client';
import { getAllEntities } from '../../utility/graph/query';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/actions/theme-action';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import ListItem from '../ListItem/list-item';
import queryString from 'query-string';
import { setGraphEntity, setGraphEndpoint } from '../../redux/actions/endpoint-action';
import DataBoard from '../DataBoard/data-board';
import Constants from '../../utility/constant';
import Loader from '../Loader/loader';
import { Tooltip } from '@mui/material';
import ErrorMessage from '../ErrorMessage/error-message';
import { LoadingState } from '../../utility/redux/state';
import humanizeString from 'humanize-string';
import Footer from '../Footer/Footer';
import { ReactComponent as DiscordSVG } from '../../svg/discord.svg';
import { ReactComponent as TwitterSVG } from '../../svg/twitter.svg';
import { ReactComponent as TelegramSVG } from '../../svg/telegram.svg';
import swal from 'sweetalert';
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<MuiAppBarProps>(() => ({
  height: '60px',
  backgroundColor: '#03000C',
  boxShadow: 'none',
}));
const drawerWidth = 300;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '2.2rem 1rem',
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const GraphData: React.FunctionComponent<RouteComponentProps<any>> = ({ location }) => {
  const label = Constants.LABELS.commonLables;
  const urlLabels = Constants.LABELS.commonUrls;
  const dispatch = useDispatch();
  const parsed = queryString.parse(location.search);
  let theme: any = parsed.th;
  let graphName: string | any = parsed.uri?.slice(parsed.uri?.lastIndexOf('/') + 1);
  if (parsed.uri) {
    graphName = humanizeString(graphName)?.toUpperCase();
  }
  if (theme === label.LIGHT_THEME_LABEL || theme === label.DARK_THEME_LABEL) {
  } else {
    theme = label.DARK_THEME_LABEL;
  }
  React.useEffect(() => {
    if (parsed.uri && parsed.e) {
      const endpointEncoded = parsed.uri;
      const endpoint = decodeURIComponent(`${endpointEncoded}`);
      const entity = parsed.e;
      dispatch(setGraphEntity(`${entity}`));
      dispatch(setGraphEndpoint(endpoint));
      return;
    }
    if (parsed.th !== undefined) {
      const val =
        parsed.th === label.LIGHT_THEME_LABEL ? label.DARK_THEME_LABEL : label.LIGHT_THEME_LABEL;
      dispatch(toggleTheme(val));
    }
    window.location.href = Constants.ROUTES.HOME_ROUTE;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const loadingScreen = useSelector((state: LoadingState) => state.dataLoading.loading);
  const handleToggleTheme = () => {
    const newTheme =
      theme === label.LIGHT_THEME_LABEL ? label.DARK_THEME_LABEL : label.LIGHT_THEME_LABEL;
    dispatch(toggleTheme(newTheme));
    theme = newTheme;
    window.location.href = `${urlLabels.BASE_URL}uri=${parsed.uri}&e=${parsed.e}&th=${theme}`;
  };
  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  const { data, error, loading } = useQuery(getAllEntities);
  let allEntities: string[];
  allEntities = [];
  if (loading) {
    if (error) {
    }
  } else {
    if (error) {
    }
    if (data) {
      const queryData = data.__schema.queryType.fields;
      for (let index = 0; index < queryData.length; ++index) {
        const element = queryData[index];
        if (index % 2 === 0) {
          allEntities.push(element.name);
        }
      }
      allEntities.pop();
    }
  }
  const drawer = (
    <div>
      <Divider sx={{ borderBottomWidth: 0.01 }} color="#00A1FF" />
      <List
        className="list-drawer"
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          backgroundColor: `${theme === label.LIGHT_THEME_LABEL ? label.WHITE : label.BLACK}`,
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {allEntities.map((item, index) => (
          <ListItem key={index} entity={item}></ListItem>
        ))}
      </List>
    </div>
  );
  return (
    <>
      {error ? (
        <div className="error-screen">
          <img className="error-found" src="/images/error-outline.gif" alt="" />
          <div>
            <ErrorMessage type="icon" errorMessage={error?.message} endpoint={parsed.uri} />
          </div>
        </div>
      ) : null}
      {loadingScreen ? <Loader theme={theme} /> : ''}
      <div className="card-container" theme-selector={theme}>
        <AppBar position="fixed" className="app-bar">
          <Toolbar className="toolbar toolbar-padding">
            <div className="menu-container">
              <Box
                sx={{
                  display: { xs: 'none', sm: 'block' },
                }}
              >
                <a href={Constants.ROUTES.HOME_ROUTE}>
                  <img
                    src="/images/cosmoDapp_white_text.png"
                    height="50px"
                    alt="cosmodapp-icon"
                  ></img>
                </a>
              </Box>
              {drawerOpen ? (
                <div className='beta-icon'>
                  <img src={`./images/beta.png`}></img>
                  <Tooltip title={label.COLLAPSE}>
                    <KeyboardDoubleArrowLeftIcon
                      className="toggle-drawer-icon"
                      onClick={handleToggleDrawer}
                    />
                  </Tooltip>
                </div>
              ) : (
                <div className='beta-icon'>
                  <img src={`./images/beta.png`}></img>
                  <Tooltip title={label.EXPAND}>
                    <KeyboardDoubleArrowRightIcon
                      className="toggle-drawer-icon"
                      onClick={handleToggleDrawer}
                    />
                  </Tooltip>
                </div>
              )}
            </div>
            <div className="social-icons">
              <div className="icon">
                <a href="https://discord.com/invite/FWyNJtEyxa" target="_blank" rel="noreferrer">
                  <DiscordSVG height={30} width={35} />
                </a>
              </div>
              <div className="icon">
                <a href="https://t.me/dapplooker" target="_blank" rel="noreferrer">
                  <TelegramSVG height={30} width={35} />
                </a>
              </div>
              <div className="icon">
                <a href="https://twitter.com/dapplooker" target="_blank" rel="noreferrer">
                  <TwitterSVG height={30} width={35} />
                </a>
              </div>
            </div>
            <h2 className="graph-heading">{graphName}</h2>
            <Tooltip title={label.SWITCH_THEME}>
              <div className="theme-icon" onClick={handleToggleTheme}>
                {theme === label.LIGHT_THEME_LABEL ? <DarkModeIcon /> : <LightModeIcon />}
              </div>
            </Tooltip>
          </Toolbar>
        </AppBar>
        <Box>
          <Drawer
            variant="temporary"
            open={drawerOpen}
            onClose={handleToggleDrawer}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            className="drawer-first"
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: drawerWidth,
                backgroundColor: `${theme === label.LIGHT_THEME_LABEL ? label.WHITE : label.BLACK}`,
                color: 'white',
                paddingBottom: '8rem',
              },
            }}
          >
            <DrawerHeader>
              <Box>
                <a href={Constants.ROUTES.HOME_ROUTE}>
                  <img
                    src="/images/cosmoDapp_theme_color_text.png"
                    height="33px"
                    alt="cosmodapp-icon"
                  ></img>
                </a>
              </Box>
            </DrawerHeader>
            {drawer}
          </Drawer>
          <Drawer
            className="drawer-two"
            sx={{
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                color: 'white',
                marginTop: '64px',
                boxSizing: 'border-box',
                backgroundColor: `${theme === label.LIGHT_THEME_LABEL ? label.WHITE : label.BLACK}`,
                paddingBottom: '8rem',
                display: { xs: 'none', sm: 'block' },
              },
            }}
            variant="persistent"
            anchor="left"
            open={drawerOpen}
          >
            {drawer}
          </Drawer>
        </Box>
        <DataBoard drawerOpen={drawerOpen}></DataBoard>
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};
export default withRouter(GraphData);
