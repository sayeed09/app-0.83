import PolicyModal from 'containers/shop/cart/cart-list/policy-modal';
import React, { useState } from 'react'
import { Text, View } from 'react-native';
import { commonStyles } from 'styles/common';

const Policies = () => {
  const [type, setType] = useState("");
  return (
    <>
      <View style={{ marginTop: 8 }}>
        <Text style={[commonStyles.fs12, commonStyles.grayColor]}>
          By continuing, you agree that you have read and accepted our
          <Text
            onPress={() => setType('termsOfService')}
            style={{ color: '#6BBD58' }}
          >
            {' '}
            Terms & Conditions{' '}
          </Text>
          <Text>and</Text>
          <Text
            onPress={() => setType('privacyPolicy')}
            style={{ color: '#6BBD58' }}
          >
            {' '}
            Privacy policy{' '}
          </Text>
        </Text>
      </View>

      {/* Policy Modal */}
      <PolicyModal
        type={type}
        visible={!!type}
        onClose={() => setType("")}
      />
    </>
  )
}

export default Policies;