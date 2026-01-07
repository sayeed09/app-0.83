import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import { } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { commonStyles } from '@styles/common';
import CartSvg from '@assets/images/icons/header-icons/cart';

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    color: '#000',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    padding: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F5F5F5',
    borderRadius: 4,
  },
  parentHr: {
    height: 1,
    width: '95%',
  },
});

const Accordion = props => {
  const {
    top,
    contentColor,
    data,
    alignTitle,
    title,
    noArrow,
    image,
    expand,
    headerData,
    expandAccordian,
  } = props;
  const [expanded, setExpanded] = useState(expand);

  const toggleExpand = () => {
    if (expandAccordian) {
      expandAccordian(!expanded);
    }
    setExpanded(!expanded);
  };

  const renderTop = (
    <TouchableNativeFeedback style={styles.row} onPress={toggleExpand}>
      <View style={styles.row}>
        <View style={[commonStyles.flexD]}>
          {alignTitle && <View style={{ width: 20, height: 20 }} />}
          {image ? (
            <Image
              source={{ uri: image }}
              style={{ width: 24, height: 24, borderRadius: 20, marginRight: 10 }}
            />
          ) : null}
          <View style={[commonStyles.flexD, commonStyles.alignCenter,]}>
            <View style={[commonStyles.mr8]}>
              <CartSvg />
            </View>
            <View style={[commonStyles.mt4]}>
              <Text
                style={[
                  commonStyles.fs14,
                  commonStyles.fw500,
                  {
                    textAlign: alignTitle ? 'center' : 'left', marginBottom: 8,
                  },
                ]}
              >
                {title}
              </Text>
            </View>
          </View>
          {noArrow ? null : expanded ? (
              <View style={{marginTop: 0,}}>
                <Icon name="chevron-up" color="#000" size={30} />
              </View>
            ) : (
              <View style={{marginTop: 0,}}>
                <Icon name="chevron-down" color="#000" size={30} />
              </View>
          )}
        </View>
        <View style={[commonStyles.flexD]}>
          {headerData}
        </View>
      </View>
    </TouchableNativeFeedback>
  );

  const renderContent = (
    <View>
      <View>{data}</View>
    </View>
  );

  return (
    <View>
      {top ? renderTop : null}
      {expanded ? renderContent : null}
      {top ? null : renderTop}
    </View>
  );
};

export default Accordion;
