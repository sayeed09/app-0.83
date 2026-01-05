import React from 'react';
import { Pressable, View, ScrollView } from 'react-native';
import { width } from 'utils/constants';
import { CustomText } from '../../../../AndroidFontFix';
import RenderHtml from 'react-native-render-html';
import CloseSvg from 'assets/images/icons/standard-icons/close_icon';

interface IProps {
  setShowPopup: (showSuccessModal: boolean) => void;
  policyResponse: any;
}

const PolicyContentPopup = ({ setShowPopup, policyResponse }: IProps) => {
  const cleanHtml =
    policyResponse?.body?.replace(/&nbsp;/g, ' ').replace(/style="[^"]*"/g, '') || '';
  return (
    <View style={{ padding: 0}}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#F1FFEE',
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          padding: 16
        }}
      >
        <CustomText
          variant="heading3"
          style={{ fontWeight: 'bold', fontSize: 20 }}
        >
          {policyResponse?.title}
        </CustomText>
        {policyResponse && (
          <Pressable onPress={() => setShowPopup(false)}>
            <CloseSvg />
          </Pressable>
        )}
      </View>

      {/* Content */}
      <View style={{ paddingVertical: 8, flex: 1, minWidth: width - 0, paddingHorizontal: 16 }}>
        <ScrollView>
          {policyResponse ? (
            <RenderHtml
              contentWidth={width - 32}
              source={{ html: cleanHtml }}
              baseStyle={{
                fontSize: 14,
                lineHeight: 22,
                color: '#000',
                textAlign: 'justify',
                flexShrink: 1, // ensures wrapping
                includeFontPadding: false,
              }}
              tagsStyles={{
                p: { marginBottom: 8, flexShrink: 1 },
                li: { marginBottom: 6, flexShrink: 1 },
                span: { flexShrink: 1 },
              }}
              renderersProps={{
                text: { allowFontScaling: false },
              }}
            />
          ) : null}
        </ScrollView>
      </View>
    </View>
  );
};

export default PolicyContentPopup;