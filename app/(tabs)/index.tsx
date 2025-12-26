import { StyleSheet, Text, TouchableHighlight } from 'react-native';

import Razorpay from 'react-native-customui';

export default function HomeScreen() {
  return (
    <TouchableHighlight style={{ marginTop: 200 }} onPress={() => {
      var options = {
        description: 'Credits towards consultation',
        currency: 'INR',
        key_id: 'rzp_test_1DP5mmOlF5G5ag',
        amount: '5000', // amount in currency subunits. Defaults to INR. 100 = 100 paise = INR 1.
        email: 'void@razorpay.com',
        contact: '9999999123',
        method: 'netbanking',
        bank: 'HDFC'
      }
      Razorpay.open(options).then((data) => {
        // handle success
        alert(`Success: ${data.razorpay_payment_id}`);
      }).catch((error) => {
        // handle failure
        alert(`Error: ${error.code} | ${error.description}`);
      });
    }}>
      <Text>
        Here
      </Text>

    </TouchableHighlight>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
