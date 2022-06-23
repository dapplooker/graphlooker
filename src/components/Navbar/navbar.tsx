import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeState } from './../../utility/redux/state';
import './navbar.scss';
import { toggleTheme } from '../../redux/actions/theme-action';
import Constants from '../../utility/constant';

const Navbar: React.FunctionComponent<{}> = (props) => {
  const dispatch = useDispatch();
  const label = Constants.LABELS.commonLables;
  const theme = useSelector((state: ThemeState) => state.themeSelector.theme);
  const handleToggleTheme = () => {
    const newTheme =
      theme === label.LIGHT_THEME_LABEL ? label.DARK_THEME_LABEL : label.LIGHT_THEME_LABEL;
    dispatch(toggleTheme(newTheme));
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar className="toolbarn toolbarn-padding">
            <div className="menu-items">
              {theme === label.LIGHT_THEME_LABEL ? (
                <img
                  src="/images/cosmoDapp_theme_color_text.png"
                  height="47px"
                  alt="cosmodapp-icon"
                ></img>
              ) : (
                <img
                  src="/images/cosmoDapp_white_text.png"
                  height="50px"
                  alt="cosmodapp-icon"
                ></img>
              )}

              <div className="theme-icon" onClick={handleToggleTheme}>
                {theme === label.LIGHT_THEME_LABEL ? <DarkModeIcon /> : <LightModeIcon />}
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Navbar;
