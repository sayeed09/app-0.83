import { FontFamily } from 'components/styles/fonts';

enum FontWeight {
  H1 = '700',
  H2 = '700',
  H3 = '600',
  H4 = '500',
  H5 = '700',
  BODY_LARGE = '400',
  BODY_SMALL = '400',
  BODY_MEDIUM = '400',
  INPUT_SMALL = '400',
  INPUT_MEDIUM = '500',
  ANCHOR_SMALL = '500',
  CAPTION_SMALL = '400',
}

enum FontSize {
  H1 = 24,
  H2 = 18,
  H3 = 16,
  H4 = 16,
  H5 = 16,
  BODY_LARGE = 16,
  BODY_MEDIUM = 14,
  BODY_SMALL = 12,
  INPUT_MEDIUM = 14,
  INPUT_SMALL = 12,
  ANCHOR_SMALL = 12,
  CAPTION_SMALL = 10,
}

enum LineHeight {
  H1 = 30,
  H2 = 22,
  H3 = 20,
  H4 = 20,
  H5 = 22,
  BODY_LARGE = 24,
  BODY_MEDIUM = 18,
  BODY_SMALL = 16,
  INPUT_MEDIUM = 18,
  INPUT_SMALL = 16,
  ANCHOR_SMALL = 16,
  CAPTION_SMALL = 14,
}

enum TextFont {
  H1 = FontFamily.SECONDARY,
  H2 = FontFamily.SECONDARY,
  H3 = FontFamily.PRIMARY,
  H4 = FontFamily.PRIMARY,
  H5 = FontFamily.SECONDARY,
  BODY_LARGE = FontFamily.PRIMARY,
  BODY_MEDIUM = FontFamily.PRIMARY,
  BODY_SMALL = FontFamily.PRIMARY,
  INPUT_MEDIUM = FontFamily.PRIMARY,
  INPUT_SMALL = FontFamily.SECONDARY,
  ANCHOR_SMALL = FontFamily.PRIMARY,
}

enum TextType {
  H1 = 'H1',
  H2 = 'H2',
  H3 = 'H3',
  H4 = 'H4',
  H5 = 'H5',
  BODY_LARGE = 'BODY_LARGE',
  BODY_MEDIUM = 'BODY_MEDIUM',
  BODY_SMALL = 'BODY_SMALL',
  INPUT_SMALL = 'INPUT_SMALL',
  INPUT_MEDIUM = 'INPUT_MEDIUM',
  ANCHOR_SMALL = 'ANCHOR_SMALL',
  CAPTION_SMALL = 'CAPTION_SMALL',
}

export { TextType, TextFont, LineHeight, FontSize, FontWeight };
