import { StyleSheet } from 'react-native';
const width_full_proportion = '100%';
const width_50_proportion = '50%';

export const commonStyles = StyleSheet.create({
  flex05: {
    flex: 0.5
  },
  gap16: {
    gap: 16
  },
  overFlowScroll: {
    overflow: 'scroll',
  },
  radius4: {
    borderRadius: 4,
  },
  radius2: {
    borderRadius: 2,
  },
  positionRelative: {
    position: 'relative',
  },
  LeftArrow: {
    position: 'absolute',
    zIndex: 1,
    left: 25,
    top: 200,
    borderRadius: 4,
    backgroundColor: '#fff',
    transform: [{ rotate: '180deg' }],
    opacity: 0.8
  },
  arrowRight: {
    position: 'absolute',
    zIndex: 1,
    right: 25,
    top: 200,
    opacity: 0.8,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  SecondaryOutlineButton: {
    borderColor: '#FF6F00',
    borderRadius: 2,
  },
  ReadMoreBtn: {
    color: '#6BBD58',
    fontFamily: 'Roboto-Medium',
    textAlign: 'right',
  },
  greenBg: {
    backgroundColor: '#B0DDA7',
  },
  darkGreenText: {
    color: '#006E5A',
  },
  lightGreenBg: {
    backgroundColor: '#C8E6C8',
  },
  wAuto: {
    maxWidth: width_full_proportion,
    width: width_full_proportion,
  },
  w50: {
    Width: width_50_proportion,
  },
  Heading18: {
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  head18: {
    fontSize: 18,
    fontFamily: 'Roboto-Bold',
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  h2Tag: {
    marginBottom: 16,
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    lineHeight: 24,
    letterSpacing: 0.15,
    fontWeight: 700
  },
  h3Tag: {
    marginBottom: 16,
    fontSize: 14,
    fontFamily: 'Roboto-Medium',
    letterSpacing: 0.1,
    lineHeight: 20
  },
  pTag: {
    marginBottom: 8,
    color: '#7E7E7E',
    fontSize: 14,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  listStyle: {
    paddingLeft: 8,
    marginBottom: 16,
    position: 'relative',
  },
  listItem: {
    marginBottom: 8,
    color: '#7E7E7E',
    fontSize: 13,
    lineHeight: 16.9,
  },
  grayColor: {
    color: '#7E7E7E',
  },
  lightGreenColor: {
    color: '#6BBD58',
  },
  lightGrayColor: {
    color: '#E0E0E0',
  },
  darkGrayColor: {
    color: '#424242',
  },
  BlackColor: {
    color: '#000',
  },
  textCenter: {
    textAlign: 'center',
  },
  textLeft: {
    textAlign: 'left',
  },
  textNoWrap: {
    flexWrap: 'wrap',
  },
  redColor: {
    color: '#cd201f',
  },
  redBg: {
    backgroundColor: '#FF6F00',
  },
  borderBottom: {
    borderBottomColor: '#E0E0E0',
    borderBottomWidth: 1,
  },
  borderAll: {
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  borderTop: {
    borderTopColor: '#E0E0E0',
    borderTopWidth: 1,
  },
  border0: {
    borderTopWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 0,
  },
  strikeText: {
    textDecorationLine: 'line-through',
  },
  bgWhite: {
    backgroundColor: '#fff',
  },
  bgBlack: {
    backgroundColor: '#000',
  },
  bgLightGray: {
    backgroundColor: '#f5f5f5',
  },
  BgLightGreen: {
    backgroundColor: '#F1FFEE',
  },
  textWhite: {
    color: '#fff',
  },
  flex: {
    flex: 1,
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  flexD: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  width: {
    width: '100%',
  },
  h52: {
    height: 52,
  },
  height90: {
    height: '90%',
  },
  height: {
    height: '100%',
  },
  scrollStyle: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  keyboardContainer: {
    flex: 1,
    paddingHorizontal: 26,
  },
  videoStyles: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    borderColor: '#000',
    borderWidth: 1,
  },

  fs11: {
    fontSize: 11,
  },
  fs10: {
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
  fs12: {
    fontSize: 12
  },
  fs14: {
    fontSize: 14,
    letterSpacing: 0.1,
    lineHeight: 20,
  },
  fs13: {
    fontSize: 13,
  },
  fs16: {
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  fs18: {
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0.15,
  },
  fs30: {
    fontSize: 30,
  },

  fw300: {
    fontWeight: '300',
  },
  fw500: {
    fontWeight: '500',
    fontFamily: 'Roboto-Medium',
  },
  fwBold: {
    fontWeight: 'bold',
  },

  pb0: {
    paddingBottom: 0,
  },
  pb4: {
    paddingBottom: 4,
  },
  pb5: {
    paddingBottom: 5,
  },
  pb10: {
    paddingBottom: 10,
  },
  pb8: {
    paddingBottom: 8,
  },
  pb15: {
    paddingBottom: 15,
  },
  pb16: {
    paddingBottom: 16,
  },
  pb20: {
    paddingBottom: 20,
  },
  pb30: {
    paddingBottom: 30,
  },
  pb70: {
    paddingBottom: 70,
  },
  pb100: {
    paddingBottom: 100,
  },
  pt30: {
    paddingTop: 30,
  },
  pt20: {
    paddingTop: 20,
  },
  pt15: {
    paddingTop: 15,
  },
  pt16: {
    paddingTop: 16,
  },
  pt10: {
    paddingTop: 10,
  },
  pt4: {
    paddingTop: 4,
  },
  pt8: {
    paddingTop: 8,
  },
  pt0: {
    paddingTop: 0,
  },
  pt5: {
    paddingTop: 5,
  },
  ph4: {
    paddingHorizontal: 4,
  },
  ph8: {
    paddingHorizontal: 8,
  },
  ph10: {
    paddingHorizontal: 10,
  },
  ph15: {
    paddingHorizontal: 15,
  },
  ph16: {
    paddingHorizontal: 16,
  },
  ph20: {
    paddingHorizontal: 20,
  },
  ph25: {
    paddingHorizontal: 25,
  },
  ph30: {
    paddingHorizontal: 30,
  },
  ph40: {
    paddingHorizontal: 40,
  },
  pv0: {
    paddingVertical: 2,
  },
  pv40: {
    paddingVertical: 40,
  },
  pv20: {
    paddingVertical: 20,
  },
  pv12: {
    paddingVertical: 12,
  },
  pv16: {
    paddingVertical: 16,
  },
  pv10: {
    paddingVertical: 10,
  },
  pv5: {
    paddingVertical: 5,
  },
  pv4: {
    paddingVertical: 4,
  },
  pv8: {
    paddingVertical: 8,
  },
  pl4: {
    paddingLeft: 4,
  },
  pl8: {
    paddingLeft: 8,
  },
  pl10: {
    paddingLeft: 10,
  },
  pl16: {
    paddingLeft: 16,
  },
  pl20: {
    paddingLeft: 20,
  },
  pl40: {
    paddingLeft: 40,
  },
  pr8: {
    paddingRight: 8,
  },
  pr16: {
    paddingRight: 16,
  },
  pr32: {
    paddingRight: 32,
  },
  pad2: {
    padding: 2,
  },
  pr4: {
    paddingLeft: 4,
  },
  pad4: {
    padding: 4,
  },
  pad8: {
    padding: 8,
  },
  pad10: {
    padding: 10,
  },
  pad15: {
    padding: 15,
  },
  pad16: {
    padding: 16,
  },
  pad20: {
    padding: 20,
  },
  pad30: {
    padding: 30,
  },
  ml5: {
    marginLeft: 5,
  },
  ml10: {
    marginLeft: 10,
  },
  ml8: {
    marginLeft: 8,
  },
  ml16: {
    marginLeft: 16,
  },
  ml25: {
    marginLeft: 25,
  },
  ml40: {
    marginLeft: 40,
  },
  ml50: {
    marginLeft: 50,
  },
  ml60: {
    marginLeft: 60,
  },
  mb0: {
    marginBottom: 0,
  },
  mb4: {
    marginBottom: 4,
  },
  mb5: {
    marginBottom: 5,
  },
  mb8: {
    marginBottom: 8,
  },
  mb10: {
    marginBottom: 10,
  },
  mb15: {
    marginBottom: 15,
  },
  mb16: {
    marginBottom: 16,
  },
  mb20: {
    marginBottom: 20,
  },
  mb30: {
    marginBottom: 30,
  },
  mt0: {
    marginTop: 0,
  },
  mt2: {
    marginTop: 2,
  },
  mt4: {
    marginTop: 4,
  },
  mt16: {
    marginTop: 16,
  },
  mt20: {
    marginTop: 20,
  },
  mt32: {
    marginTop: 32,
  },
  mt8: {
    marginTop: 8,
  },
  mt10: {
    marginTop: 10,
  },
  mt30: {
    marginTop: 30,
  },
  mt40: {
    marginTop: 40,
  },
  mr4: {
    marginRight: 4,
  },
  ml4: {
    marginLeft: 4,
  },
  mr8: {
    marginRight: 8,
  },
  mr10: {
    marginRight: 10,
  },
  mr16: {
    marginRight: 16,
  },
  mr20: {
    marginRight: 20,
  },
  mr40: {
    marginRight: 40,
  },

  mar0: {
    margin: 0,
  },

  mb_5: {
    marginBottom: -5,
  },
  mh2: {
    marginHorizontal: 2,
  },
  mh4: {
    marginHorizontal: 4,
  },
  mh8: {
    marginHorizontal: 8,
  },
  mh16: {
    marginHorizontal: 16,
  },
  mv8: {
    marginVertical: 8,
  },
  mv16: {
    marginVertical: 16,
  },
  mv20: {
    marginVertical: 20,
  },
  flexView: {
    backgroundColor: '#fff',
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  justifySpaceAround: {
    justifyContent: 'space-around',
  },
  selectIcon: {
    position: 'absolute',
    top: '50%',
    right: 10,
    marginTop: -5,
  },
  cancelText: {
    flex: 1,
    marginRight: 6,
  },
  okText: {
    flex: 1,
    marginLeft: 6,
  },

  imgStyle: {
    marginRight: 10,
    height: 20,
    width: 20,
  },
  markerSize: {
    height: 42,
    width: 44,
  },
  nodataImage: {
    width: 65,
    height: 62,
    marginTop: '50%',
  },
  bdr: { borderWidth: 1, borderColor: 'red' },
  bdrb: { borderWidth: 1, borderColor: 'blue', margin: 5 },
  bg: { backgroundColor: 'rgba(255,0,0,0.2)' },
  w50: { maxWidth: '50%', display: 'flex' },
  tapImage: { width: '50%', padding: 16 },
  tapAvatar: { width: '100%', height: 'auto', borderRadius: 100 },
  imgMaskImg: { width: '100%', height: '100%' },
  uline: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#000',
  },
  creditIcon: {
    width: 29,
    height: 19,
    alignItems: 'center',
    marginBottom: 6,
    marginRight: 5,
  },
  centerContent: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
  },
  walletList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 10,
  },
  DottedLine: {
    flex: 1,
    resizeMode: 'repeat',
    justifyContent: 'flex-end',
    marginLeft: 3,
    marginRight: 3,
  },
  ReferalFloatPill: {
    backgroundColor: '#E0E9EF',
    borderRadius: 19,
    overflow: 'hidden',
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingVertical: 4,
    position: 'absolute',
    bottom: -18,
  },
  animateImage: {
    width: 308,
    height: 213,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  viewMaxWidth: {
    maxWidth: 300,
  },
  inputWrapDefault: {
    position: 'relative',
    borderWidth: 1,
    color: '#000',
    borderColor: '#B3B3B3',
    borderRadius: 2,
    lineHeight: 16,
    letterSpacing: 0.27,
    width: '100%',
    alignSelf: 'center',
    paddingVertical: 12,
    zIndex: 1,
    paddingHorizontal: 35,
  },
  linkStyle: { color: '#2980b9', fontSize: 20 },
  offerCardBox: {
    flex: 1,
    flexDirection: 'row',
    borderStyle: 'dashed',
    borderColor: '#6BBD58',
    borderWidth: 1,
    borderRadius: 2,
    backgroundColor: '#F1FFEE',
    marginBottom: 16,
  },
  borderLeftGreen: {
    backgroundColor: '#6BBD58',
    width: 16,
    height: '100%',
  },
  offerCardBoxDisabled: {
    borderColor: '#BDBDBD',
    backgroundColor: '#FFF',
  },
  borderLeftGreenDisabled: {
    backgroundColor: '#BDBDBD',
  },
  disableText: {
    color: '#BDBDBD'
  },
  loading: {
    opacity: 0.6
  },
  boxShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1
  }
});
