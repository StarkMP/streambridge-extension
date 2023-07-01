import React, { JSX, ReactNode } from 'react';

import { Header } from '../../components';

const BaseLayout = ({ children }: { children: ReactNode }): JSX.Element => (
  <>
    <Header />
    {children}
  </>
);

export default BaseLayout;
