import React from 'react'
import LineItem from './line-item'
import { ThreeMonthConsultationDetail } from 'utils/constants'

const ThreeMonthConsult = () => {
  return (
    <>
      <LineItem consultationDetail={ThreeMonthConsultationDetail} setCartItemPopupProductId={() => {}} setIsConsultClick={() => {}}/>
    </>
  )
}

export default ThreeMonthConsult