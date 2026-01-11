import CloseSvg from 'assets/images/icons/standard-icons/close_icon';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { AppStackDefinition } from 'routes/definitions';

import { StyledButton } from '@components/base/button/styled';
import { CustomText } from '../../../../AndroidFontFix';

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoWrapper: {
    paddingVertical: 10,
    marginVertical: 10,
  },
  topBarTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    paddingLeft: 12,
  },
});

const BackToShopIcon = ({
  title,
  navigation,
}: {
  title: string;
  navigation: NativeStackNavigationProp<AppStackDefinition>;
}) => (
  <StyledButton onPress={() => navigation.navigate('index')}>
    <View style={styles.container}>
      <CloseSvg />
        {title ? <CustomText style={styles.topBarTitle}>{title}</CustomText> : null}
    </View>
  </StyledButton>
);

export default BackToShopIcon;
