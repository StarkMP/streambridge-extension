import { getChannelBySource } from '@shared/api/services/whitelist';
import { maxLocalWhitelistLength } from '@shared/constants';
import { PlatformId } from '@shared/types';
import { getPlatformById } from '@shared/utils/platform';
import { Button, Form, Input, message, Select, Space, Typography } from 'antd';
import React, { JSX, useState } from 'react';
import { useLocalizer } from 'reactjs-localizer';

import { useStorage } from '../../context/StorageContext';
import { useSimpleRouter } from '..';
import { InfoAlert, TwitchInput, Wrapper } from './styles';

const { Title } = Typography;
const { Option } = Select;

type AddChannelFormValues = {
  sourceId: PlatformId;
  channelId: string;
  twitch: string;
};

const AddChannelPage = (): JSX.Element => {
  const [sourceId, setSourceId] = useState<string>();
  const [fetching, setFetching] = useState<boolean>(false);
  const [validatonError, setValidatonError] = useState<string | null>(null);
  const [form] = Form.useForm<AddChannelFormValues>();
  const { localize } = useLocalizer();
  const { storage, updateStorage } = useStorage();
  const { setPageError } = useSimpleRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const onChannelIdChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;

    setValidatonError(null);
    form.setFieldValue('twitch', value ? `${value}-${sourceId}`.toLowerCase() : '');
  };

  const onReset = (): void => {
    setSourceId(void 0);
    setValidatonError(null);
  };

  const addChannel = async (values: AddChannelFormValues): Promise<void> => {
    const { twitch, channelId, sourceId } = values;

    setFetching(true);

    if (storage.localWhitelist.length >= maxLocalWhitelistLength) {
      setValidatonError(
        localize('popup.add-channel.error-limit', { maxCount: maxLocalWhitelistLength })
      );

      setFetching(false);

      return;
    }

    const existsChannel = storage.localWhitelist.find((channel) => channel.twitch === twitch);

    if (existsChannel) {
      setValidatonError(localize('popup.add-channel.error-existing'));

      setFetching(false);

      return;
    }

    const platform = getPlatformById(sourceId);
    const formattedChannel = {
      id: `${channelId}:${sourceId}`,
      twitch,
      source: { id: sourceId, channelId },
      isLocal: true,
    };
    const info = await platform.getInfo(formattedChannel);

    if (info === null) {
      setValidatonError(localize('popup.add-channel.error-fetch'));

      setFetching(false);

      return;
    }

    try {
      const { data } = await getChannelBySource([`${channelId}:${sourceId}`]);

      if (data.length === 0) {
        await updateStorage({ localWhitelist: [...storage.localWhitelist, formattedChannel] });
        messageApi.success(localize('popup.add-channel.success'));
        form.resetFields();

        return;
      }

      setValidatonError(localize('popup.add-channel.error-available', { twitch: data[0].twitch }));
    } catch (err) {
      setPageError(true);
    } finally {
      setFetching(false);
    }
  };

  const onSubmit = (values: AddChannelFormValues): void => {
    addChannel(values);
  };

  return (
    <Wrapper>
      {contextHolder}

      <Title style={{ marginBottom: '15px' }} level={5}>
        {localize('popup.add-channel.title')}
      </Title>

      <Form
        disabled={fetching}
        onFinish={onSubmit}
        onReset={onReset}
        form={form}
        layout='vertical'
        autoComplete='off'
      >
        <Form.Item
          name='sourceId'
          label={localize('popup.add-channel.fields-platform')}
          rules={[{ required: true, message: localize('popup.validation-errors.required') }]}
        >
          <Select
            placeholder={localize('popup.add-channel.fields-platform-placeholder')}
            onChange={(value: string): void => setSourceId(value)}
          >
            {Object.values(PlatformId)
              // TODO: temporary
              .filter((item) => item !== PlatformId.YouTube)
              .map((id) => {
                return (
                  <Option key={id} value={id}>
                    {localize(`platform.${id}.name`)}
                  </Option>
                );
              })}
          </Select>
        </Form.Item>
        <Form.Item
          name='channelId'
          label={localize('popup.add-channel.fields-nickname')}
          rules={[
            { required: true, message: localize('popup.validation-errors.required') },
            { min: 2, message: localize('popup.validation-errors.min', { length: 2 }) },
            { max: 32, message: localize('popup.validation-errors.max', { length: 32 }) },
            { pattern: /^[A-Za-z0-9_]*$/g, message: localize('popup.validation-errors.format') },
          ]}
          validateStatus={validatonError ? 'error' : undefined}
          help={validatonError || undefined}
        >
          <Input
            placeholder={localize('popup.add-channel.fields-nickname-placeholder')}
            onChange={onChannelIdChange}
            disabled={!sourceId}
          />
        </Form.Item>
        <Form.Item name='twitch' label={localize('platform.twitch.name')}>
          <TwitchInput disabled addonBefore='twitch.tv/' />
        </Form.Item>

        <InfoAlert
          message={
            <>
              {localize('popup.add-channel.info-description')}{' '}
              <a>{localize('popup.add-channel.info-question')}</a>
            </>
          }
          type='info'
          showIcon
        />

        <Form.Item>
          <Space>
            <Button loading={fetching} type='primary' htmlType='submit'>
              {localize('popup.add-channel.submit')}
            </Button>
            <Button htmlType='reset'>{localize('popup.add-channel.reset')}</Button>
          </Space>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

export default AddChannelPage;
