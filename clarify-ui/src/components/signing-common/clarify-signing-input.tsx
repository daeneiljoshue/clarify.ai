
import React, { useEffect, useState } from 'react';
import Icon from '@ant-design/icons';
import { ClearIcon } from 'icons';
import { Input } from 'antd';
import Text from 'antd/lib/typography/Text';

interface SocialAccountLinkProps {
  id?: string;
  autoComplete?: string;
  placeholder: string;
  value?: string;
  type?: ClarifyInputType;
  disabled?: boolean;
  onReset?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export enum ClarifyInputType {
  TEXT = 'text',
  PASSWORD = 'password',
}

function ClarifySigningInput(props: SocialAccountLinkProps): JSX.Element {
  const {
    id,
    autoComplete,
    type,
    onReset,
    placeholder,
    value,
    onChange,
    disabled,
  } = props;
  const [valueNonEmpty, setValueNonEmpty] = useState(!!disabled);

  useEffect(() => {
    setValueNonEmpty(!!value);
  }, [value]);

  if (type === ClarifyInputType.PASSWORD) {
    return (
      <Input.Password
        value={value}
        autoComplete={autoComplete}
        className={valueNonEmpty ? 'clarify-input-floating-label-above' : 'clarify-input-floating-label'}
        prefix={<Text>{placeholder}</Text>}
        id={id}
        onChange={onChange}
      />
    );
  }

  return (
    <Input
      value={value}
      autoComplete={autoComplete}
      className={valueNonEmpty ? 'clarify-input-floating-label-above' : 'clarify-input-floating-label'}
      prefix={<Text>{placeholder}</Text>}
      id={id}
      disabled={disabled}
      suffix={valueNonEmpty && !disabled && (
        <Icon
          component={ClearIcon}
          onClick={() => {
            setValueNonEmpty(false);
            if (onReset) onReset();
          }}
        />
      )}
      onChange={onChange}
    />
  );
}

export default React.memo(ClarifySigningInput);
