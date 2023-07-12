import { Input } from 'antd';
import React, { JSX } from 'react';
import { useLocalizer } from 'reactjs-localizer';

import { ListHeader as StyledListHeader, ListHeaderColumns } from './styles';

const { Search } = Input;

type ListHeaderProps = {
  search: string;
  onSearch: (value: string) => void;
};

const ListHeader = ({ search, onSearch }: ListHeaderProps): JSX.Element => {
  const { localize } = useLocalizer();

  return (
    <StyledListHeader>
      <Search
        value={search}
        onChange={(e): void => onSearch(e.currentTarget.value)}
        placeholder={localize('popup.channel-list.search')}
        allowClear
      />
      <ListHeaderColumns>
        <b>{localize('popup.channel-list.channel')}</b>
        <b>{localize('popup.channel-list.followed')}</b>
      </ListHeaderColumns>
    </StyledListHeader>
  );
};

export default ListHeader;
