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
import { ReactComponent as DiscordSVG } from '../../svg/discord.svg';
import { ReactComponent as TwitterSVG } from '../../svg/twitter.svg';
import { ReactComponent as TelegramSVG } from '../../svg/telegram.svg';
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
          <Toolbar className="toolbar toolbar-padding">
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
                <div>
                  <img className='beta-icon' src={`/images/beta.png`} />
                </div>
              </div>
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
