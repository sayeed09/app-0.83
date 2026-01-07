import { RUPEE_SYMBOL } from './constants';

export const formatCurrencyWithSymbol = (currencyAmount: number | string) =>
  `${RUPEE_SYMBOL}${Number(currencyAmount).toFixed(0)}`;
export const currencyWithSymbol = (currencyAmount: number) =>
  `${RUPEE_SYMBOL}${Number(currencyAmount)}`;

export const convertToPaise = (moneyInRupees: number): number =>
  moneyInRupees * 100;

export const convertToRupees = (moneyInPaise: number): number =>
  Number((moneyInPaise / 100).toFixed(0));
