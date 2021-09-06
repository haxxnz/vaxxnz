
import React from 'react';
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
} from 'react-share';


export const ShareButtons = () => {
    const shareUrl = 'https://vaxx.nz';
    const title = 'Vaxx.nz | NZ COVID Vaccination Finder';

    return (
      <>
       <div>
          <FacebookShareButton
            url={shareUrl}
            quote={title}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>
        </div>

        <div>
          <FacebookMessengerShareButton
            url={shareUrl}
            appId="1207927626340037"
          >
            <FacebookMessengerIcon size={32} round />
          </FacebookMessengerShareButton>
        </div>

        <div>
          <TwitterShareButton
            url={shareUrl}
            title={title}
          >
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>

        <div>
          <LinkedinShareButton url={shareUrl}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
        </div>


        <div>
          <RedditShareButton
            url={shareUrl}
            title={title}
            windowWidth={660}
            windowHeight={460}
          >
            <RedditIcon size={32} round />
          </RedditShareButton>
        </div>
        <div>
          <EmailShareButton
            url={shareUrl}
            subject={title}
            body="body"
          >
            <EmailIcon size={32} round />
          </EmailShareButton>
        </div>
        </>
    );
}