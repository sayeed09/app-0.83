import Check from 'assets/images/icons/standard-icons/check';
import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  benefits: string[];
}

function Benefits({ benefits }: Props) {
  if (!benefits || benefits.length === 0) {
    return null;
  }
  return (
    <>
      {benefits.length > 0 && (
        <View
          style={{
            flexDirection: 'row',
            maxWidth: 100,
          }}
        >
          {benefits.slice(0, 2).map((benefit, index) => {
            return (
              <View
                key={benefit}
                style={[
                  {
                    flexDirection: 'row',
                    alignItems: 'center',
                  },
                  index === 0 ? { marginRight: 4 } : {},
                ]}
              >
                <Check style={{ alignSelf: 'center', marginRight: 5 }} />
                <Text
                  style={{ fontSize: 12 }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {benefit} {index === 1 && benefits.length > 2 ? '...' : ''}{' '}
                </Text>
              </View>
            );
          })}
        </View>
      )}
    </>
  );
}
export default Benefits;
