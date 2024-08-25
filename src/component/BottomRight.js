import React from 'react'
import RevenueChart from './RevenusChart'
import OrderValueChart from './OrderValueChart'
import "../Style/MainContainer.css"

const BottomRight = () => {
  return (
    <div class="bottom-right">
        <RevenueChart/>
        <OrderValueChart/>
    </div>
  )
}

export default BottomRight