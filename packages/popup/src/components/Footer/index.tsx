import { discordUrl, donationAlertsUrl, websiteUrl } from '@shared/constants';
import React, { JSX } from 'react';
import { useLocalizer } from 'reactjs-localizer';

import { Link, Wrapper } from './styles';

export const Footer = (): JSX.Element => {
  const { localize } = useLocalizer();

  return (
    <Wrapper>
      <Link href={donationAlertsUrl} target='_blank'>
        {localize('popup.footer.donate')}
      </Link>
      <Link href={discordUrl} target='_blank'>
        {localize('popup.footer.discord')}
      </Link>
      <Link href={websiteUrl} target='_blank'>
        {localize('popup.footer.website')}
      </Link>
    </Wrapper>
  );
};
