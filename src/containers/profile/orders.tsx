import React, { useEffect, useState } from 'react';
import { FlatList, ListRenderItem, Text } from 'react-native';
// import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

import { loginSuccessful, setLoginModal } from '@actions/modals';
import { Box, SafeBottomSpace } from '@components/base/foundation';
import { BaseView } from '@components/base/view';
import Loader from '@components/elements/loader/loader';
import OrderSummary from '@components/orders/summary';
import { FullPageErrorFallback } from '@components/shared/error';
import { useModalsDispatch, useModalsState } from '@context/modals';
import { Order } from '@models/orders';
import { height } from '@utils/constants';
import { getOrderListService } from 'services/user';
import useLogin from 'hooks/login';

const renderOrder: ListRenderItem<Order> = ({ item }) => (
  <OrderSummary order={item} />
);
const keyExtractor = (item: Order) => item?.id;

const Orders = ({ navigation }) => {
  const [orderList, setOrderList] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>();
  const modalsDispatch = useModalsDispatch();
  const { isLoginSuccessful } = useModalsState();
  const { handleLogout } = useLogin();

  const getOrderList = () => {
    setLoading(true);
    getOrderListService()
    .then((orders) => {
      setOrderList(orders);
      setLoading(false);
    }).catch(error => {
      setLoading(false);
      setError(error);
      if(error?.response?.status === 401){
        handleLogout();
        navigation.navigate('ProfileScreen');
      }
    });
  }

  useEffect(() => {
    if (isLoginSuccessful) {
      getOrderList();
    }
  }, [isLoginSuccessful]);

  navigation.addListener('focus', () => {
    getOrderList();
  });

  const retry = login => {
    if (login) {
      modalsDispatch(setLoginModal(true));
    } else {
      getOrderList();
    }
  };

  if (loading) {
    return <Loader />;
  }
  if (error && !isLoginSuccessful) {
    const login = error?.message.includes('401');
    return (
      <FullPageErrorFallback
        onRetry={() => retry(login)}
        title={login ? 'Login' : 'Retry'}
        error={error as AxiosError}
        noMessage={login}
      />
    );
  }
  return (
    <FlatList
      data={orderList ?? []}
      onRefresh={getOrderList}
      refreshing={loading}
      renderItem={renderOrder}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={() => <Box pt={3} />}
      ListFooterComponent={SafeBottomSpace}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={
        <BaseView Center style={{ height }}>
          <Text>No Orders Available</Text>
        </BaseView>
      }
    />
  );
};
export default Orders;
