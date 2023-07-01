// we don't need a separate router library
// because we have few view content states (pages)
// without nesting routes
import React, {
  createContext,
  JSX,
  ReactNode,
  useContext,
  useState,
} from 'react';

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
  setLoading: (loading: boolean) => void;
  setPage: (page: Pages) => void;
};

const SimpleRouterContext = createContext<SimpleRouterContextProps>(
  {} as SimpleRouterContextProps
);

export const useSimpleRouter = (): SimpleRouterContextProps =>
  useContext(SimpleRouterContext);

type OutletProps = {
  loader: ReactNode;
};

export const Outlet = ({ loader }: OutletProps): JSX.Element | ReactNode => {
  const { page, loading } = useSimpleRouter();
  const CurrentPageComponent = pageComponent[page];

  return loading ? loader : <CurrentPageComponent />;
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
  const [page, setPage] = useState<Pages>(props.defaultPage);

  return (
    <SimpleRouterContext.Provider
      value={{ loading, page, setLoading, setPage }}
    >
      {children}
    </SimpleRouterContext.Provider>
  );
};
