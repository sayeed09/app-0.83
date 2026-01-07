export enum PaymentMethodType {
  CARD = 'card',
  NETBANKING = 'netbanking',
  WALLET = 'wallet',
  COD = 'cod',
  UPI = 'UPI',
}

export interface IValidateUPIId {
  data?: ICorrectUPIId;
  error?: IIncorrectUPIId;
}

export interface ICorrectUPIId {
  vpa: string;
  name: string;
}
export interface IIncorrectUPIId {
  code: string;
  reason: string;
}

export const getPaymentMethod = inputPaymentMethod => {
  switch (inputPaymentMethod) {
    case PaymentMethodType.COD:
      return 'cod';
    case PaymentMethodType.NETBANKING:
      return 'netbanking';
    case PaymentMethodType.UPI:
      return 'UPI';
    case PaymentMethodType.WALLET:
      return 'WALLET';
    case PaymentMethodType.CARD:
      return 'CCDC';
    default:
      return 'UPI'
  }
};
