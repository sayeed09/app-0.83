import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { Box, Hr, Text } from 'components/base/foundation';
import { AppStackDefinition } from 'routes/definitions';
import { Pressable } from 'react-native';

const Support = ({
  navigation,
}: {
  navigation: StackNavigationProp<AppStackDefinition>;
}) => {
  const openPrivacyPolicy = () => navigation.navigate('Privacy');
  const openTermsAndCondition = () => navigation.navigate('Terms');
  const openHelpDesck = () => navigation.navigate('HelpDesk');
  return (
    <Box backgroundColor="levelOneBg">
       <Pressable p={4} onPress={openHelpDesck}>
        <Text>Help Desk</Text>
      </Pressable>
      <Hr />
      <Pressable p={4} onPress={openPrivacyPolicy}>
        <Text>Privacy Policy</Text>
      </Pressable>
      <Hr />
      <Pressable p={4} onPress={openTermsAndCondition}>
        <Text>Terms & Conditions</Text>
      </Pressable>
    </Box>
  );
};

export default Support;
