import { ErrorIcon } from 'assets/images/icons/error-icon';
import { CustomText } from '../../../AndroidFontFix';
import CheckRoundIcon from 'assets/images/icons/standard-icons/check-round-icon';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { width } from 'utils/constants';
import PrimaryButton from 'components/elements/button/primary-Button';
import { primaryOrange } from 'components/styles/colors';

interface IProps {
  text1: string;
  text2: string;
  isLoginFailed: boolean;
  setShowSuccessModal?: (showSuccessModal: boolean) => void;
}

const OfferAppliedModal = ({
  text1,
  text2,
  isLoginFailed,
  setShowSuccessModal,
}: IProps) => (
  <>
    <View
      style={{
        margin: 16,
        width: width / 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
      }}
    >
      <View style={{ paddingVertical: 8 }}>
        {isLoginFailed ? <ErrorIcon /> : <CheckRoundIcon />}
      </View>
      <View style={{ marginTop: 4 }}>
        <CustomText
          variant="heading3"
          style={isLoginFailed ? { fontWeight: 'bold', fontSize: 20 } : {}}
        >
          {text1}
        </CustomText>
      </View>
      <View style={{ paddingVertical: 8, alignItems: 'center' }}>
        <CustomText
          variant="heading1"
          style={!isLoginFailed ? { fontWeight: 'bold' } : { color: '#7E7E7E' }}
        >
          {text2}{' '}
          {isLoginFailed && (
            <Text style={{ color: '#6BBD58' }}>community@oziva.in</Text>
          )}
        </CustomText>
      </View>
      {isLoginFailed ? (
        <View style={{ paddingVertical: 4, alignItems: 'center', marginTop: 4 }}>
          <PrimaryButton
            title="OKAY !"
            accentColor={primaryOrange}
            height={44}
            onAction={() => setShowSuccessModal && setShowSuccessModal(false)}
          />
        </View>
      ) : null}
    </View>
  </>
);

export default OfferAppliedModal;
