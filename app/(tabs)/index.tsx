import { Button, Dimensions, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import analytics from '@react-native-firebase/analytics';
import Razorpay from 'react-native-customui';

const source = { uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Moringa_-_Antioxidant_a8510dfb-073f-479f-b031-769f50f54710.pdf?v=1742514473' };

export default function HomeScreen() {
  return (
    <View style={{ marginTop: 100 }}>
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

      <Button
        title="Add To Basket"
        onPress={async () =>
          await analytics().logEvent('add_to_cart', {
            id: 3745092,
            item: 'mens grey t-shirt',
            description: ['round neck', 'long sleeved'],
            size: 'L',
          })
        }
      />
      {/* <View style={styles.container}>
        <Pdf
          trustAllCerts={false}
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf} />
      </View> */}
    </View>


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
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
