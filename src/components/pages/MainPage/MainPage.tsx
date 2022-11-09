import React from 'react'

import SliderPage from '../SliderPage/SliderPage'
import TestPage from '../TestPage/TestPage'

const MainPage = () => {
  return (
    <div>
      <TestPage />
      {/* <SliderPage /> */}
    </div>
  )
}

export default React.memo(MainPage)
