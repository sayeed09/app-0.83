import React from 'react';
import { Icon } from 'react-native-elements';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Box, Text } from 'components/base/foundation';
import dayjs from 'dayjs';
import { AppStackDefinition } from 'routes/definitions';
import { CustomText } from '../../../AndroidFontFix';
import { trackMoEngageAppEvent } from '@utils/common';
import { useNotificationState } from 'context/notifications';
import { Pressable } from 'react-native';

export const primeStyles = {
  primeLeaf: {
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
};

const PrimeSummary = ({ endsOn, primeProfile }: { endsOn?: string, primeProfile?: any }) => {
  const { trackingTransparency } = useNotificationState();
  const navigation = useNavigation<
    NativeStackNavigationProp<AppStackDefinition>
  >();
  const navigateToDetails = () => {
    trackMoEngageAppEvent({
      event: `oziva_prime_icon_clicked_app`,
      values: [],
      trackingTransparency,
    });
    navigation.navigate('OZivaPrime');
  };
  return (
    <Pressable
      backgroundColor="levelTwoBg"
      p={2}
      flex={1}
      elevation={3}
      borderRadius={8}
      onPress={navigateToDetails}
    >
      <Box flexDirection="row" alignItems="center">
        <Box flex={1}>
          <Box flexDirection="row" alignItems="center">
            <Box
              borderTopLeftRadius={13}
              borderBottomRightRadius={13}
              borderTopRightRadius={1}
              borderBottomLeftRadius={1}
              bg="brandSecondary"
              alignItems="center"
              justifyContent="center"
              mr={1}
              style={primeStyles.primeLeaf}
            >
              <CustomText fontSize={8} lineHeight={8} fontWeight="bold">
                PRIME
              </CustomText>
            </Box>
            <Text variant="heading4">OZiva Prime</Text>
          </Box>
          {
            primeProfile?.current_status === 'prime' &&
              endsOn ? (
                <Box>
                  <Text variant="heading4" color="hintText" mb={1} mt={2}>
                    Membership Ends On
              </Text>
                  <Text variant="heading3">
                    {dayjs(endsOn).format('DD MMMM YYYY')}
                  </Text>
                </Box>
              ) : <Box>
                <Text variant="heading4" color="hintText" mb={1} mt={2}>
                  Get Exclusive Benefits
              </Text>
                <Text variant="heading3">
                  Become a Member
              </Text>
              </Box>}
        </Box>
        <Box p={1}>
          <Box
            borderRadius={4}
            opacity={0.25}
            backgroundColor="appBg"
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
          />
          <Icon name="chevron-right" size={18} />
        </Box>
      </Box>
    </Pressable>
  );
};

export default PrimeSummary;
