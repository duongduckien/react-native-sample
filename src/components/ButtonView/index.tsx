import React from 'react';
import { Button } from '@rneui/themed';
import { IconNode } from '@rneui/base';

interface IProps {
  text?: string;
  loading?: boolean;
  styles?: any;
  icon?: IconNode;
  onPress(): any;
}

const ButtonView = (props: IProps) => {
  const handleOnPress = () => {
    props.onPress();
  };

  return (
    <Button
      buttonStyle={props.styles}
      title={props.text}
      loading={props.loading}
      icon={props.icon}
      onPress={handleOnPress}
    />
  );
};

export default ButtonView;
