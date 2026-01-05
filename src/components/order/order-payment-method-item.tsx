import React from 'react';
import CODIconComponent from 'assets/images/icons/payment-icons/COD-icon';
import DebitCardIconComponent from 'assets/images/icons/payment-icons/debit_card_icon';
import NetbankingIconComponent from 'assets/images/icons/payment-icons/netbanking-icon';
import UPIIconComponent from 'assets/images/icons/payment-icons/UPI-icon';
import WalletIconComponent from 'assets/images/icons/payment-icons/wallet_icon';
import { Text } from 'components/base/foundation';
import { BaseView } from 'components/base/view';

const OrderPaymentMethodItem = ({ paymentMethod }): React.ReactElement => {
  const isCard = paymentMethod === 'card';
  const isNetbanking = paymentMethod === 'netbanking';
  const isUPI = paymentMethod === 'upi';
  const isWallet = paymentMethod === 'wallet';
  const isCOD = paymentMethod === 'cod';
  return (
    <BaseView row style={{ marginTop: 10 }}>
      {isCard ? <DebitCardIconComponent width={20} height={20} /> : null}
      {isWallet ? <WalletIconComponent width={20} height={20} /> : null}
      {isNetbanking ? <NetbankingIconComponent width={20} height={20} /> : null}
      {isUPI ? <UPIIconComponent width={20} height={20} /> : null}
      {isCOD ? <CODIconComponent width={20} height={20} /> : null}
      <Text variant="body1" style={{ marginLeft: 10 }}>
        Paid By{' '}
      </Text>
      {isCard ? <Text variant="body1">Debit/Credit Card</Text> : null}
      {isWallet ? <Text variant="body1">Wallet</Text> : null}
      {isNetbanking ? <Text variant="body1">Netbanking</Text> : null}
      {isUPI ? <Text variant="body1">UPI</Text> : null}
      {isCOD ? <Text variant="body1">Cash on Delivery</Text> : null}
    </BaseView>
  );
};

export default OrderPaymentMethodItem;
