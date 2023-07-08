import { Languages } from '@shared/types';
import { Typography } from 'antd';
import React, { JSX } from 'react';
import { useLocalizer } from 'reactjs-localizer';

import { useStorage } from '../../context/StorageContext';
import { Label, Select, Wrapper } from './styles';

const { Title } = Typography;

const UserSettingsPage = (): JSX.Element => {
  const { localize, language, setLanguage } = useLocalizer();
  const { updateStorage } = useStorage();

  const onChangeLanguage = (value: string): void => {
    setLanguage(value);

    updateStorage({
      language: value as Languages,
    }).catch((err) => console.error(err));
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

export default UserSettingsPage;
