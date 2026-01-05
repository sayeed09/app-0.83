import Bubble from 'components/bubbles-bar/bubble';
import { Collection } from 'models/collection';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { commonStyles } from 'styles/common';
import BubbleSkeleton from '../bubbles-bar/bubble-skeleton';
import { width } from 'utils/constants';

interface IProps {
  collections: Collection[];
  handleClickOnBubble: (item: Collection) => void;
  selectedCollection: Collection;
}

const CollectionBubbles = (props: IProps) => {
  const { collections, handleClickOnBubble, selectedCollection } = props;
  const [collectionCords, setCollectionCords] = useState([]);

  const scrollView = useRef(null);
  const scrollTo = () => {
    if (scrollView) {
      scrollView?.current?.scrollTo({
        x: collectionCords[selectedCollection.handle],
        y: 0,
        animated: true,
      });
    }
  };
  useEffect(() => {
    if (
      selectedCollection &&
      selectedCollection.handle &&
      collections.length > 0
    )
      scrollTo();
  }, [selectedCollection]);
  return (
    <>
      <ScrollView horizontal ref={scrollView}>
        <View
          style={[
            commonStyles.flexRow,
            commonStyles.bgWhite,
            commonStyles.mv8,
            { width: collections && collections.length > 4 ? '100%' : width },
          ]}
        >
          {collections && collections.length > 0 ? (
            collections.map((item, index) => {
              return (
                <Bubble
                  item={item}
                  isSelected={selectedCollection?.handle == item.handle}
                  handleCollectionChange={item => {
                    handleClickOnBubble(item);
                  }}
                  setCollectionCords={setCollectionCords}
                  collectionCords={collectionCords}
                  key={index}
                />
              );
            })
          ) : (
            <BubbleSkeleton />
          )}
        </View>
      </ScrollView>
    </>
  );
};
export default CollectionBubbles;
