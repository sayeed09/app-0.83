import FastImage from '@d11/react-native-fast-image';
import WhiteCard from 'components/elements/card/white-card';
import {
    IScientificallyTested,
    IWhatMakesItGood,
} from 'models/product-details/product';
import React from 'react';
import { Text, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import SvgRenderer from 'react-native-svg-renderer';
import { commonStyles } from 'styles/common';
import { width } from 'utils/constants';

interface Props {
  data: IWhatMakesItGood;
}
interface IProps {
  data: IScientificallyTested;
}
const getImageComponent = resLinkOrSvg => {
  if (resLinkOrSvg.includes('https') && resLinkOrSvg.includes('.svg')) {
    return (
      <SvgRenderer width="50" height="50" source={{ uri: resLinkOrSvg }} />
    );
  }
  if (resLinkOrSvg.includes('https')) {
    return (
      <FastImage
        source={{ uri: resLinkOrSvg, priority: FastImage.priority.normal }}
        style={{ width: 50, height: 50 }}
      />
    );
  }
  if (resLinkOrSvg.includes('<svg')) {
    return (
      <SvgXml
        xml={resLinkOrSvg}
        style={{ transform: [{ scale: 0.8 }] }}
        width={width * 0.22}
      />
    );
  }
  return <></>;
};
export const WhatMakesItGood = (props: Props) => {
  const { data } = props;
  if (!data.data || data.data.length === 0) {
    return null;
  }

  return (
    <>
      <View style={[commonStyles.pt4]}>
        <WhiteCard noBorderRadius style={[commonStyles.pv0, commonStyles.pt8]}>
          <View>
            <Text style={[commonStyles.h2Tag]}>What makes it good?</Text>
          </View>
          <>
            {data?.data.map(res => (
              <View
                key={res.title}
                style={[commonStyles.flexRow, commonStyles.pt0]}
              >
                <View style={[commonStyles.ph16, commonStyles.pb16]}>
                  {res.image && getImageComponent(res.image)}
                </View>
                <View
                  style={[
                    commonStyles.flexColumn,
                    commonStyles.flex,
                    commonStyles.pl10,
                  ]}
                >
                  <Text
                    style={[
                      commonStyles.fs14,
                      commonStyles.fw500,
                      commonStyles.pb4,
                    ]}
                  >
                    {res?.title}
                  </Text>
                  <View style={[commonStyles.flexRow, commonStyles.mb16]}>
                    <Text
                      style={[
                        commonStyles.fs12,
                        {
                          color: '#7E7E7E',
                          flex: 1,
                          width,
                          flexWrap: 'wrap',
                        },
                      ]}
                    >
                      {res?.description}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </>
        </WhiteCard>
      </View>
    </>
  );
};
export const AndEvenBetter = (props: IProps) => {
  const { data } = props;
  if (!data || data.highlights.length === 0) {
    return null;
  }

  return (
    <>
      <View style={[commonStyles.pt5]}>
        <WhiteCard noBorderRadius style={[commonStyles.pv8]}>
          <View>
            <Text style={[commonStyles.h2Tag]}>{data.title}</Text>
          </View>
          <View
            style={[
              commonStyles.flexRow,
              {
                flexWrap: 'wrap',
                alignContent: 'center',
                alignItems: 'baseline',
                justifyContent: 'center',
              },
            ]}
          >
            {data?.highlights.map(res => (
              <View
                key={res?.title}
                style={[
                  {
                    flexBasis: 0,
                    flexGrow: 1,
                    justifyContent: 'center',
                    minWidth: 80,
                  },
                  commonStyles.ph8,
                  commonStyles.pb16,
                ]}
              >
                <View style={[commonStyles.mb8, commonStyles.flexRowCenter]}>
                  {res.image && getImageComponent(res.image)}
                </View>
                <View>
                  <Text
                    style={[
                      commonStyles.fs12,
                      commonStyles.textCenter,
                      commonStyles.darkGrayColor,
                    ]}
                  >
                    {res?.title}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </WhiteCard>
      </View>
    </>
  );
};
