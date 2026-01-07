export const base = 'white';
export const text = '#434449';
export const gray = '#f1f2f7';
export const grayE0 = '#e0e0e0';
export const grayFA = '#FAFAFA';
export const grayb3 = '#b3b3b3';
export const grayd9 = '#D9D9D9';
export const gray10 = '#f1f1f4';
export const gray20 = '#e4e5e9';
export const gray40 = '##b6b8ba';
export const gray7E = '#7E7E7E';
export const gray76 = '#767676';
export const gray80 = '#6f7077';
export const indigo = '#3f51b5';
export const indigoDarken10 = '#364495';
export const indigoLighten80 = '#b7c1f8';
export const yellow = '#ffc107';
export const green = '#4caf50';
export const danger = '#ef5350';
export const orange = 'orange';
export const lightBlue = '#F0FCFF';
export const primaryOrange = '#FF6F00';
export const paleGreen = '#006E5A0F';
export const darkGreen = '#006E5A';
export const ctaGreen = '#6BBD58';
export const orderPromoLightGreen = '#F0FAF099';
export const errorRed = '#CD201F';
export const errorRedBackground = '#CD201F0A';

export enum Color {
  SPACE = '#2D3958',
  STEEL = '#7B88A8',
  DARK_GRAY = '#979CA5',
  AZURE = '#4685FF',

  DARK_BLUE = '#001d54',

  CLOUD = '#F4F5F6',
  SNOW = '#F2F2F2',
  WHITE = '#FFFFFF',
  LIGHT_GRAY = '#7E7E7E',
  CARD_SHADOW = 'rgba(141,141,141, 0.15)',
  SMOKE = '#EEEEEE',

  BLACK = '#232b2b',

  ROYAL = '#001D54',
  MEDIUM_BLUE = '#6FA1FF',
  SALMON = '#FFE6E1',
  SALMON_LIGHT = '#ffefec',
  LIGHT_BLUE = '#E2ECFF',
  EXTRA_LIGHT_BLUE = 'rgba(226, 236, 255, 0.25)',
  LIGHT_BLUE_2 = '#C2DAFF',
  STEEL_BLUE = '#6882B5',

  PEACE = '#FFC4B7',

  TRANSPARENT = 'transparent',

  DISABLED = '#F4F5F6',
  ALERT = '#FF0000',
  ALERT_LIGHT = 'ff3e3e',
  SUCCESS = '#7AE626',
  WARNING = '#FFBC23',
  SEMANTIC = '#6FA1FF',

  GREEN = 'green',
  BRIGHT_GREEN = '#AEEA54',
  PAYMENT_DISABLED = ' #FE8B6C'
}

export interface HoverColors {
  hoverText: Color;
  hoverBackground: Color;
  regularText: Color;
  regularBackground: Color;
  regularBorder?: Color;
  hoverBorder?: Color;
}

export interface HoverIcons {
  onHoverIcon: any;
  offHoverIcon: any;
}
