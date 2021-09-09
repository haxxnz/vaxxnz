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

import { enqueueAnalyticsEvent } from './utils/analytics';

export const ShareButtons = () => {
  const shareUrl = "https://vaxx.nz";
  const title = "Vaxx.nz | NZ COVID Vaccination Finder";

  return (
    <>
      <div>
        <FacebookShareButton url={shareUrl} quote={title} onClick={() => enqueueAnalyticsEvent('Share with Facebook clicked')}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
      </div>

      <div>
        <FacebookMessengerShareButton url={shareUrl} appId="1207927626340037" onClick={() => enqueueAnalyticsEvent('Share with FB Messenger clicked')}>
          <FacebookMessengerIcon size={32} round />
        </FacebookMessengerShareButton>
      </div>

      <div>
        <TwitterShareButton url={shareUrl} title={title} onClick={() => enqueueAnalyticsEvent('Share with Twitter clicked')}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
      </div>

      <div>
        <LinkedinShareButton url={shareUrl} onClick={() => enqueueAnalyticsEvent('Share with LinkedIn clicked')}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </div>

      <div>
        <RedditShareButton
          url={shareUrl}
          title={title}
          windowWidth={660}
          windowHeight={460}
          onClick={() => enqueueAnalyticsEvent('Share with Reddit clicked')}
        >
          <RedditIcon size={32} round />
        </RedditShareButton>
      </div>
      <div>
        <EmailShareButton url={shareUrl} subject={title} 
          body="Have a look at:" 
          onClick={() => enqueueAnalyticsEvent('Share with Email clicked')}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
    </>
  );
};
