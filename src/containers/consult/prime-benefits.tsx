import { BaseView } from 'components/base/view'
import React from 'react'
import { Text,View } from 'react-native'
import { commonStyles } from 'styles/common'
import { BenefitsText } from 'utils/constants'

const PrimeBenefits = () => {

  return (
    <>
      <BaseView AlignLeft style={{ margin: 10 }}>
      <Text style={[commonStyles.fs16, commonStyles.fwBold]}>
            Benefits you'll love!
          </Text>
          <View style={{ marginLeft: 10, display: 'flex', flexDirection: 'column' }}>
            {
              BenefitsText.map(text => {
                return (
                  <View style={[commonStyles.flexRow, commonStyles.alignCenter]}>
                    <Text style={{fontSize: 6, marginRight: 4}}>{'\u2B24  '}</Text><Text style={[commonStyles.fs12, commonStyles.mv8]}>{text}</Text>
                  </View>
                )
              })
            }
          </View>
        </BaseView>
        
      </>
  )
}

export default PrimeBenefits