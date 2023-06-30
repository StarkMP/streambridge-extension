import { getLocalStorage, setLocalStorage } from '@shared/storage';
import { Languages } from '@shared/types';
import { Select as SelectComponent } from 'antd';
import { Typography } from 'antd';
import React, { JSX } from 'react';
import { useLocalizer } from 'reactjs-localizer';
import styled from 'styled-components';

const { Title, Text } = Typography;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled(Text)`
  margin-bottom: 4px;
`;

const Select = styled(SelectComponent)`
  width: 250px;
`;

const Settings = (): JSX.Element => {
  const { localize, language, setLanguage } = useLocalizer();

  const onChangeLanguage = (value: string): void => {
    setLanguage(value);

    getLocalStorage()
      .then((storage) => {
        setLocalStorage({
          ...storage,
          language: value as Languages,
        }).catch(() => {});
      })
      .catch(() => {});
  };

  return (
    <Wrapper>
      <Title level={5}>{localize('popup.header.settings')}</Title>

      <Label>{localize('popup.settings.language')}</Label>
      <Select
        // @ts-ignore
        onChange={onChangeLanguage}
        defaultValue={language}
        options={[
          { value: Languages.English, label: localize('language.en') },
          { value: Languages.Russian, label: localize('language.ru') },
        ]}
      />
    </Wrapper>
  );
};

export default Settings;
