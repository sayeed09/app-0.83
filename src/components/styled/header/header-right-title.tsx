import React from 'react';
import { Text, View } from 'react-native';
import { commonStyles } from 'styles/common';

interface Props {
  title: string;
}
const HeaderRightTitle = ({ title }: Props) => {
  return (
    <>
      <View style={{ marginTop: 8, marginRight: 8 }}>
        <Text style={[commonStyles.fs12]}>{title}</Text>
      </View>
    </>
  );
};
export default HeaderRightTitle;
