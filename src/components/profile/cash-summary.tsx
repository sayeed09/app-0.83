import React from 'react';
import { Icon } from 'react-native-elements';
import { NativeStackNavigationProp } from 'react-native-screens/lib/typescript/native-stack';
import { useNavigation } from '@react-navigation/native';
import { Box, Text } from 'components/base/foundation';
import { AppStackDefinition } from 'routes/definitions';
import { trackMoEngageAppEvent } from '@utils/common';
import { useNotificationState } from 'context/notifications';
import { Pressable } from 'react-native';

interface Props {
  balance: number;
}

const CashSummary = ({ balance }: Props) => {
  const { trackingTransparency } = useNotificationState();
  const navigation = useNavigation<
    NativeStackNavigationProp<AppStackDefinition>
  >();
  const navigateToDetails = () => { 
    trackMoEngageAppEvent({
      event: `oziva_cash_page_clicked_app`,
      values: [],
      trackingTransparency,
    });
    navigation.navigate('OZivaCash');
  }
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
              width={28}
              height={28}
              borderRadius={28}
              borderWidth={2}
              borderColor="brandSecondary"
              alignItems="center"
              justifyContent="center"
              mr={1}
            >
              <Text
                color="brandSecondary"
                fontSize={6}
                lineHeight={6}
                textAlign="center"
                fontWeight="bold"
              >
                OZiva Cash
              </Text>
            </Box>
            <Text variant="heading4">OZiva Cash</Text>
          </Box>
          <Text variant="heading4" color="hintText" mb={1} mt={2}>
            Total Balance
          </Text>
          <Text variant="heading3">{Number(balance)}</Text>
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

export default CashSummary;
