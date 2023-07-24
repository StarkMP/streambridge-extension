import React, { JSX, ReactNode } from 'react';

import { Footer, Header, PageError, PageLoader } from '../../components';
import { useSimpleRouter } from '../../pages';
import { ContentWrapper } from './styles';

const BaseLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  const { pageLoading, pageError } = useSimpleRouter();

  if (pageError) {
    return <PageError />;
  }

  if (pageLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
      <Footer />
    </>
  );
};

export default BaseLayout;
