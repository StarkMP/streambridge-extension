import React, { JSX, ReactNode } from 'react';

import { Header, PageError, PageLoader } from '../../components';
import { useSimpleRouter } from '../../pages';

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
      {children}
    </>
  );
};

export default BaseLayout;
