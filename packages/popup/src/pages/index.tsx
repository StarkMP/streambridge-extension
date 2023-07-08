// we don't need a separate router library
// because we have few view content states (pages)
// without nesting routes
import React, { createContext, JSX, ReactNode, useContext, useState } from 'react';

import ChannelsWhitelistPage from './channels-whitelist';
import UserSettingsPage from './user-settings';

export enum Pages {
  ChannelsWhitelist = 'channels-whitelist',
  UserSettings = 'user-settings',
}

const pageComponent = {
  [Pages.ChannelsWhitelist]: ChannelsWhitelistPage,
  [Pages.UserSettings]: UserSettingsPage,
};

type SimpleRouterContextProps = {
  loading: boolean;
  page: Pages;
  error: string | null;
  setLoading: (loading: boolean) => void;
  setPage: (page: Pages) => void;
  setError: (error: string | null) => void;
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
  const [loading, setLoading] = useState<boolean>(props.loading || false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<Pages>(props.defaultPage);

  return (
    <SimpleRouterContext.Provider value={{ loading, page, error, setLoading, setPage, setError }}>
      {children}
    </SimpleRouterContext.Provider>
  );
};
