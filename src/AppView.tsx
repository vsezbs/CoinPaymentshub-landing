import Cursor from 'components/common/Cursor/Cursor'
import Header from 'components/common/Header/Header'
import MainPage from 'components/pages/MainPage/MainPage'
import SliderPage from 'components/pages/SliderPage/SliderPage'
// import ConnectPage from 'components/pages/ConnectPage/ConnectPage'
import TestPage from 'components/pages/TestPage/TestPage'
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

import s from './AppView.module.scss'

const AppView = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
      } catch (e) {
        console.log(e)
      }
    }
    bootstrapAsync().finally(() => {
      setIsLoading(false)
    })
  }, [])

  return isLoading ? (
    <div>loading...</div>
  ) : (
    <>
      <Cursor />
      <Header />

      <div className={s.app_container}>
        <Routes>
          <Route path="/">
            <Route index element={<MainPage />} />
          </Route>
        </Routes>
      </div>
    </>
  )
}

export default React.memo(AppView)
