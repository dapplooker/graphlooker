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
          <a
            href={Constants.URL.THEGRAPH}
            target="_blank"
            rel="noreferrer"
            className="icon footer-left-info"
          >
            <GraphProtocolSVG />
            {Constants.LABELS.commonLables.GRAPH_PROTOCOL}
          </a>
        </div>
        <div className="social-icons-footer">
          <div className="icon">
            <a href={Constants.URL.DISCORD} target="_blank" rel="noreferrer">
              <DiscordSVG />
            </a>
          </div>

          <div className="icon">
            <a href={Constants.URL.TWITTER} target="_blank" rel="noreferrer">
              <TwitterSVG />
            </a>
          </div>

          {/* <div className="icon">
            <a href={Constants.URL.MEDIUM_BLOG} target="_blank" rel="noreferrer">
              <MediumSVG />
            </a>
          </div> */}

          <div className="icon">
            <a href={Constants.URL.TELEGRAM} target="_blank" rel="noreferrer">
              <TelegramSVG />
            </a>
          </div>

          <div className="icon">
            <a href={Constants.URL.GITHUB} target="_blank" rel="noreferrer">
              <GithubSVG />
            </a>
          </div>

          {/* <div className="icon">
            <a href={Constants.URL.YOUTUBE} target="_blank" rel="noreferrer">
              <YoutubeSVG />
            </a>
          </div> */}
        </div>

        <div className="copyright-info">
          {Constants.LABELS.commonLables.COPYRIGHT}
          <a href={Constants.URL.DAPPLOOKER} target="_blank" rel="noreferrer">
            {Constants.LABELS.commonLables.DAPPLOOKER}
          </a>
          {Constants.LABELS.commonLables.TEAM}
        </div>
      </footer>
    </>
  );
};

export default Footer;
