import * as React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { commonStyles } from 'styles/common';
import PolicyModal from './policy-modal';
import { FOOTER_BADGES } from 'utils/constants';

interface IProps {
  showTrustBadges: boolean;
}
const FooterDetails = ({ showTrustBadges }: IProps) => {
  const [type, setType] = React.useState("");
  return (
    <>
      {showTrustBadges ? <View style={[commonStyles.flexD, commonStyles.alignCenter]}>
        {FOOTER_BADGES.map((item, index) => {
          return (
            <View style={styles.footerBadges}>
              <View
                key={index}
                style={[
                  commonStyles.flexD,
                  commonStyles.alignCenter,
                  commonStyles.pad8,
                  { flex: 1 },
                ]}
              >
                <View style={[commonStyles.mr4]}>
                  <Image
                    source={{
                      uri: item.image,
                    }}
                    style={{ width: 40, height: 40 }}
                  />
                </View>
                <Text style={[commonStyles.fs10]}>{item.title}</Text>
              </View>
              <Pressable onPress={() => setType(item.type)}>
                <Text>{item.header}</Text>
              </Pressable>
            </View>
          );
        })}
      </View> : <View
        style={[
          commonStyles.flexD,
          commonStyles.pad8,
          styles.container,
          {
            marginTop: 16,
            marginBottom: 24,
            flexWrap: 'wrap'
          }
        ]}
      >
        <Pressable onPress={() => setType('refundPolicy')}>
          <Text style={styles.text}>Refund Policy,</Text>
        </Pressable>
        <Pressable onPress={() => setType('privacyPolicy')}>
          <Text style={styles.text}>Privacy Policy</Text>
        </Pressable>
        <Text style={[commonStyles.grayColor]}>and</Text>
        <Pressable onPress={() => setType('termsOfService')}>
          <Text style={styles.text}>Terms Of Service</Text>
        </Pressable>
      </View>}
      {/* Policy Modal */}
      <PolicyModal
        type={type}
        visible={!!type}
        onClose={() => setType("")}
      />
    </>
  );
}
export default FooterDetails;

const styles = StyleSheet.create({
  text: {
    color: '#006E5A',
    textDecorationLine: 'underline',
    marginRight: 2,
    fontWeight: '500'
  },
  container: {
    display: 'flex',
    gap: 4,
    justifyContent: 'center'
  },
  footerBadges: {display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 16, marginBottom: 16}
})
