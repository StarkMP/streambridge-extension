import React, { JSX, ReactNode } from 'react';

import { Header, PageLoader } from '../../components';
import { useSimpleRouter } from '../../pages';

const BaseLayout = ({ children }: { children: ReactNode }): JSX.Element => {
  const { loading, error } = useSimpleRouter();

  if (error) {
    return <p>{error}</p>;
  }

  if (loading) {
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
