import React from 'react';
import { Image, Pressable } from 'react-native';
import { setChatWootModal } from 'actions/modals';
import WhiteCard from 'components/elements/card/white-card';
import { useModalsDispatch } from 'context/modals';


const FreeTrialPrimeMemberSection = (): React.ReactElement => {
  const modalsDispatch = useModalsDispatch();
  return (
    <WhiteCard noBorderRadius style={{ marginBottom: 10 }}>
        <Pressable
          onPress={() => {
            modalsDispatch(setChatWootModal(true));
          }}
        >
        <Image
          source={{ uri: 'https://cdn.shopify.com/s/files/1/2393/2199/files/Prime_page_CWE.png?v=1698659549' }}
          style={{width: '100%', height: 180}}
        />
        </Pressable>
    </WhiteCard>
  );
};

export default FreeTrialPrimeMemberSection;
