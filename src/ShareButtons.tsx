import React from "react";
import {
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  RedditIcon,
  EmailIcon,
} from "react-share";

import { enqueAnalyticsEvent } from './utils/analytics';

export const ShareButtons = () => {
  const shareUrl = "https://vaxx.nz";
  const title = "Vaxx.nz | NZ COVID Vaccination Finder";

  return (
    <>
      <div>
        <FacebookShareButton url={shareUrl} quote={title} onClick={() => enqueAnalyticsEvent('Share by Facebook clicked')}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>

      <div>
        <FacebookMessengerShareButton url={shareUrl} appId="1207927626340037" onClick={() => enqueAnalyticsEvent('Share by FB Messenger clicked')}>
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>
      </div>

      <div>
        <TwitterShareButton url={shareUrl} title={title} onClick={() => enqueAnalyticsEvent('Share by Twitter clicked')}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>

      <div>
        <LinkedinShareButton url={shareUrl} onClick={() => enqueAnalyticsEvent('Share by LinkIn clicked')}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>

      <div>
        <RedditShareButton
          url={shareUrl}
          title={title}
          windowWidth={660}
          windowHeight={460}
          onClick={() => enqueAnalyticsEvent('Share by Reddit clicked')}
        >
          <RedditIcon size={32} round />
        </RedditShareButton>
      </div>
      <div>
        <EmailShareButton url={shareUrl} subject={title} 
          body="Have a look at:" 
          onClick={() => enqueAnalyticsEvent('Share by Email clicked')}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
    </>
  );
};
