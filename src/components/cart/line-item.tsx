import { Box } from 'components/base/foundation';
import { HorizontalCardT1Style } from 'components/product-cards/horizontal-card/style';
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Image, Text, View } from 'react-native';
import { commonStyles } from 'styles/common';
import { formatCurrencyWithSymbol } from 'utils/currency-utils';

interface IProps {
  consultationDetail: any;
  setCartItemPopupProductId?: (value: string | boolean) => void;
  setIsConsultClick?: (value: boolean) => void;
}

const LineItem = ({ consultationDetail, setCartItemPopupProductId, setIsConsultClick }: IProps) => {
  const { image, title, badgeTitle, compareAtPrice } = consultationDetail
  return (
    <Box style={styles.horizontalCard}>
      <TouchableOpacity onPress={() => {
        setCartItemPopupProductId && setCartItemPopupProductId(true);
        setIsConsultClick && setIsConsultClick(true);
      }}>
        <Image source={{ uri: image }} style={styles.consultationImage} />
      </TouchableOpacity>
      <View style={styles.consultationContent}>
        <Text style={styles.consultationTitle} onPress={() => {
          setCartItemPopupProductId && setCartItemPopupProductId(true);
          setIsConsultClick && setIsConsultClick(true);
        }}>
          {title}
        </Text>
        <Text style={styles.consultationBadge}>{badgeTitle}</Text>
        {
          compareAtPrice > 0 && (
            <Text style={styles.mrpContainer}>
              MRP: <Text style={styles.mrpStrikeThrough}>
                {formatCurrencyWithSymbol(compareAtPrice)}
              </Text>
              <Text style={styles.freeMRPText}>{` FREE`}</Text>
            </Text>
          )
        }
      </View>
    </Box>
  )
}

export default LineItem;

const styles = StyleSheet.create({
  horizontalCard: {
    ...HorizontalCardT1Style.StandardProductCard,
    ...commonStyles.bgWhite,
    padding: 8,
  },
  consultationImage: { width: 70, height: 70 },
  consultationContent: { marginLeft: 8, flex: 1 },
  consultationTitle: {
    ...commonStyles.mb0, ...commonStyles.mb4, ...commonStyles.fs14, ...commonStyles.fw500
  },
  consultationBadge: {
    fontSize: 12,
    color: '#FFF',
    backgroundColor: '#006E5A',
    width: 68,
    textAlign: 'center',
    borderRadius: 50,
    paddingVertical: 2, 
    marginBottom: 8
  },
  freeMRPText: { fontSize: 14, fontWeight: '500', color: '#000' },
  mrpContainer: { color: '#757575', fontSize: 12 },
  mrpStrikeThrough: { textDecorationLine: 'line-through', color: '#757575', fontSize: 12 }
});