import { Collection } from 'models/collection';
import React, { useEffect, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { commonStyles } from 'styles/common';
import Tab from './tab';
import { width } from 'utils/constants';
import TagSkeleton from './tag-skeleton';

interface IProps {
  collections: Collection[];
  handleClickOnTab: (item: Collection | undefined) => void;
  selectedSubCollection: Collection;
  loading: boolean;
  setSubCollectionCords: any;
  subCollectionCords: any;
}

const SubCollectionTags = (props: IProps) => {
  const {
    collections,
    handleClickOnTab,
    selectedSubCollection,
    subCollectionCords,
    loading,
    setSubCollectionCords,
  } = props;
  const scrollView = useRef(null);
  const scrollTo = () => {
    if (scrollView) {
      scrollView?.current?.scrollTo({
        x: subCollectionCords[selectedSubCollection.handle],
        y: 0,
        animated: true,
      });
    }
  };
  useEffect(() => {
    if (
      selectedSubCollection &&
      selectedSubCollection.handle &&
      collections.length > 0
    )
      scrollTo();
  }, [selectedSubCollection, collections]);
  return (
    <>
      <View
        style={[
          commonStyles.flexRow,
          commonStyles.bgWhite,
          commonStyles.mh4,
          {},
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollView}
        >
          {collections ? (
            <>
              <View
                onLayout={event => {
                  setSubCollectionCords({
                    ...subCollectionCords,
                    ['']: event.nativeEvent.layout.x,
                  });
                }}
              >
                <Tab
                  collection={{
                    name: 'All',
                    handle: '',
                    imgSrc: '',
                  }}
                  isSelected={!selectedSubCollection}
                  handleOnClick={item => handleClickOnTab(undefined)}
                />
              </View>

              {!loading &&
                collections.map(item => {
                  return (
                    <View
                      onLayout={event => {
                        setSubCollectionCords({
                          ...subCollectionCords,
                          [item.handle]: event.nativeEvent.layout.x,
                        });
                      }}
                      key={item.handle}
                    >
                      <Tab
                        collection={item}
                        isSelected={
                          selectedSubCollection?.handle == item.handle
                        }
                        handleOnClick={item => handleClickOnTab(item)}
                      />
                    </View>
                  );
                })}
            </>
          ) : (
            <View style={[commonStyles.pad8]}>
              <TagSkeleton />
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
};
export default SubCollectionTags;
