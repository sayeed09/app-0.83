import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import DeliveryTruckIconComponent from 'assets/images/icons/standard-icons/delivery_truck_icon';
import { BaseView } from 'components/base/view';
import Loader from 'components/elements/loader/loader';
import { darkGreen, paleGreen } from 'components/styles/colors';
import { CustomText } from '../../../AndroidFontFix';
import {axiosClient} from 'services/axios';
import { deliveryDurationEndpoint } from 'utils/constants';
import { DeliveryDurationResponse } from 'models/orders';

const OrderDeliveryDuration = ({ pincode }): React.ReactElement => {
  const [dataLoading, isDataLoading] = useState(true);
  const [responseData, setResponseData] = useState<DeliveryDurationResponse>();
  useEffect(() => {
    fetchDeliveryDuration();
  }, []);

  const fetchDeliveryDuration = async () => {
    isDataLoading(true);
    if(pincode){
      const { data } = await axiosClient.get<DeliveryDurationResponse>(
        `${deliveryDurationEndpoint}/${pincode}`,
      );
      setResponseData(data);
      isDataLoading(false);
    }
  };

  if (dataLoading) return <Loader />;
  if (!dataLoading && !responseData) return <></>;
  return (
    <>
      {responseData && !dataLoading ? (
        <BaseView
          row
          AligLeft
          style={{ padding: 10, backgroundColor: paleGreen, marginTop: 10 }}
        >
          <BaseView style={{ marginRight: 10 }}>
            <DeliveryTruckIconComponent />
          </BaseView>
          <Text style={{ fontSize: 16 }}>
            <Text>Delivery between: </Text>
            <CustomText style={{ fontWeight: 'bold', color: darkGreen }}>
              {responseData?.displayRange} days
            </CustomText>
          </Text>
        </BaseView>
      ) : (
        <BaseView
          row
          AligLeft
          style={{ padding: 10, backgroundColor: paleGreen, marginTop: 10 }}
        >
          <Text>
            Your pincode was invalid! We&apos;ll get in touch with you to
            correct this.{' '}
          </Text>
        </BaseView>
      )}
    </>
  );
};

export default OrderDeliveryDuration;
