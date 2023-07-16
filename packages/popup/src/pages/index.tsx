// we don't need a separate router library
// because we have few view content states (pages)
// without nesting routes
import React, { createContext, JSX, ReactNode, useContext, useState } from 'react';

import AddChannelPage from './add-channel';
import ChannelsWhitelistPage from './channels-whitelist';
import UserSettingsPage from './user-settings';

export enum Pages {
  ChannelsWhitelist = 'channels-whitelist',
  UserSettings = 'user-settings',
  AddChannel = 'add-channel',
}

const pageComponent = {
  [Pages.ChannelsWhitelist]: ChannelsWhitelistPage,
  [Pages.UserSettings]: UserSettingsPage,
  [Pages.AddChannel]: AddChannelPage,
};

type SimpleRouterContextProps = {
  pageLoading: boolean;
  page: Pages;
  pageError: boolean;
  setPageLoading: (loading: boolean) => void;
  setPage: (page: Pages) => void;
  setPageError: (error: boolean) => void;
};

const SimpleRouterContext = createContext<SimpleRouterContextProps>({} as SimpleRouterContextProps);

export const useSimpleRouter = (): SimpleRouterContextProps => useContext(SimpleRouterContext);

export const Outlet = (): JSX.Element => {
  const { page } = useSimpleRouter();
  const CurrentPageComponent = pageComponent[page];

  return <CurrentPageComponent />;
};

type SimpleRouterProviderProps = {
  loading?: boolean;
  defaultPage: Pages;
  children: ReactNode;
};

export const SimpleRouterProvider = ({
  children,
  ...props
}: SimpleRouterProviderProps): JSX.Element => {
  const [pageLoading, setPageLoading] = useState<boolean>(props.loading || false);
  const [pageError, setPageError] = useState<boolean>(false);
  const [page, setPage] = useState<Pages>(props.defaultPage);

  return (
    <SimpleRouterContext.Provider
      value={{ pageLoading, page, pageError, setPageLoading, setPage, setPageError }}
    >
      {children}
    </SimpleRouterContext.Provider>
  );
};
