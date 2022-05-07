import React from 'react';
import './footer.scss';
import { ReactComponent as DiscordSVG } from '../../svg/discord.svg';
import { ReactComponent as TwitterSVG } from '../../svg/twitter.svg';
import { ReactComponent as MediumSVG } from '../../svg/medium.svg';
import { ReactComponent as TelegramSVG } from '../../svg/telegram.svg';
import { ReactComponent as GithubSVG } from '../../svg/github.svg';
import { ReactComponent as GraphProtocolSVG } from '../../svg/graph-protocol.svg';
import { ReactComponent as YoutubeSVG } from '../../svg/youtube.svg';
import Constants from '../../utility/constant';
const Footer: React.FunctionComponent<any> = () => {
  return (
    <>
      <footer>
        <div className="footer-left-info">
          {Constants.LABELS.commonLables.BUILT_WITH}
          <a href="https://dapplooker.com/" target="_blank" rel="noreferrer" className="icon">
            <GraphProtocolSVG />
          </a>
          {Constants.LABELS.commonLables.GRAPH_PROTOCOL}
        </div>
        <div className="social-icons-footer">
          <div className="icon">
            <a href="https://discord.com/invite/FWyNJtEyxa" target="_blank" rel="noreferrer">
              <DiscordSVG />
            </a>
          </div>
          <div className="icon">
            <a href="https://twitter.com/dapplooker" target="_blank" rel="noreferrer">
              <TwitterSVG />
            </a>
          </div>
          <div className="icon">
            <a href="https://dapplooker.medium.com/" target="_blank" rel="noreferrer">
              <MediumSVG />
            </a>
          </div>
          <div className="icon">
            <a href="https://t.me/dapplooker" target="_blank" rel="noreferrer">
              <TelegramSVG />
            </a>
          </div>
          <div className="icon">
            <a href="https://github.com/dapplooker" target="_blank" rel="noreferrer">
              <GithubSVG />
            </a>
          </div>
          <div className="icon">
            <a
              href="https://www.youtube.com/channel/UC1KJmtb3UhnWSN_sDv71_fg"
              target="_blank"
              rel="noreferrer"
            >
              <YoutubeSVG />
            </a>
          </div>
        </div>
        <div className="copyright-info">
          {Constants.LABELS.commonLables.COPYRIGHT}
          <a href="https://dapplooker.com/" target="_blank" rel="noreferrer">
            {Constants.LABELS.commonLables.DAPPLOOKER}
          </a>
          {Constants.LABELS.commonLables.TEAM}
        </div>
      </footer>
    </>
  );
};
export default Footer;
