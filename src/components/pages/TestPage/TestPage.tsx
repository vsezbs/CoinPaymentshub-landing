import { Context } from 'components/app/IsMobile'
import React, { useContext } from 'react'

import TestMobilePage from './TestMobilePage'
import TestPageDesktop from './TestPageDesktop'

const TestPage = () => {
  const isMobile = useContext(Context)
  return isMobile ? <TestMobilePage /> : <TestPageDesktop />
}

export default TestPage
