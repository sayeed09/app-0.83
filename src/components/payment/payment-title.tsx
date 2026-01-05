import React from 'react';
import { Text } from 'react-native';
import CODIconComponent from 'assets/images/icons/payment-icons/COD-icon';
import DebitCardIconComponent from 'assets/images/icons/payment-icons/debit_card_icon';
import NetbankingIconComponent from 'assets/images/icons/payment-icons/netbanking-icon';
import UPIIconComponent from 'assets/images/icons/payment-icons/UPI-icon';
import WalletIconComponent from 'assets/images/icons/payment-icons/wallet_icon';
import { BaseView } from 'components/base/view';
import { PaymentMethodType } from 'models/payment';
import { commonStyles } from 'styles/common';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


interface Props {
  expanded: boolean;
  title: string;
  method: PaymentMethodType;
}

const PaymentTitle = (props: Props): React.ReactElement => {
  const { expanded, title, method } = props;
  const isCard = method === PaymentMethodType.CARD;
  const isWallet = method === PaymentMethodType.WALLET;
  const isNetbanking = method === PaymentMethodType.NETBANKING;
  const isUPI = method === PaymentMethodType.UPI;
  const isCOD = method === PaymentMethodType.COD;
  return (
    <BaseView row style={{ justifyContent: 'space-between' }}>
      <BaseView row>
        {/* Refactor: Check the props passed to component */}
        {isCard ? <DebitCardIconComponent width={24} height={24} /> : null}
        {isWallet ? <WalletIconComponent width={24} height={24} /> : null}
        {isNetbanking ? (
          <NetbankingIconComponent width={24} height={24} />
        ) : null}
        {isUPI ? <UPIIconComponent width={24} height={24} /> : null}
        {isCOD ? <CODIconComponent width={24} height={24} /> : null}
        <Text style={[commonStyles.fs14, commonStyles.fw500, commonStyles.ml8]}>
          {title}
        </Text>
      </BaseView>
      {expanded ? <Icon name="chevron-up" color="#000" size={30} /> : 
      <Icon name="chevron-down" color="#000" size={30} />}
    </BaseView>
  );
};

export default PaymentTitle;
