import { donationAlertsUrl, extensionUrl, telegramUrl } from '@shared/constants';
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
      <Link href={telegramUrl} target='_blank'>
        {localize('popup.footer.telegram')}
      </Link>
      <Link href={extensionUrl} target='_blank'>
        {localize('popup.footer.share')}
      </Link>
    </Wrapper>
  );
};
