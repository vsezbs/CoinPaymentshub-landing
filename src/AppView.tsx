import Cursor from 'components/common/Cursor/Cursor'
import Header from 'components/common/Header/Header'
import MainPage from 'components/pages/MainPage/MainPage'
import SliderPage from 'components/pages/SliderPage/SliderPage'
// import ConnectPage from 'components/pages/ConnectPage/ConnectPage'
import TestPage from 'components/pages/TestPage/TestPage'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import gsap from 'gsap'
import { Context } from 'components/app/IsMobile'

import s from './AppView.module.scss'

const AppView = () => {
  const [isLoading, setIsLoading] = useState(true)
  const loaderRef = useRef<any>(null)
  const loaderRef2 = useRef<any>(null)

  const isMobile = useContext(Context)
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const ctx = gsap.context(() => {
          const tl = gsap.timeline()
          // tl.set('.app', { y: '50%', overflow: 'hidden' })
          tl.set(loaderRef2.current, {
            background: 'rgb(247, 248, 251)',
          })
          tl.set('.h1-wrapper', { opacity: 0, autoAlpha: 0 })
          tl.set('.circle', { y: isMobile ? 120 : 130 })
          tl.to(
            loaderRef2.current,
            {
              delay: 1,
              duration: 2,
              y: '-50%',
              background: '#ffffff',
              ease: 'power4.out',
            },
            'f',
          )
            .to(
              loaderRef.current,
              {
                delay: 1,
                duration: 2,
                y: '-100%',
                ease: 'power4.out',
              },
              'f',
            )
            .to(
              loaderRef2.current,
              {
                delay: 1,
                duration: 2,
                y: '-100%',
                ease: 'power4.out',
              },
              'f',
            )
            .to(
              '.circle',
              {
                y: 0,
                delay: isMobile ? 0.3 : 0.5,
                duration: 1,
                ease: 'power4.out',
                opacity: 1,
              },
              'f',
            )
          tl.fromTo(
            '.h1-wrapper',
            {
              y: 60,
              opacity: 0,
              autoAlpha: 0,
            },
            {
              autoAlpha: 1,
              y: 0,
              delay: 1.5,
              duration: 2,
              opacity: 1,
              ease: 'power4.out',
            },
            'f',
          )
          tl.fromTo(
            '.h1-wrapper-mobile',
            {
              y: 60,
              opacity: 0,
              autoAlpha: 0,
            },
            {
              autoAlpha: 1,
              y: 0,
              delay: 1.5,
              duration: 2,
              opacity: 1,
              ease: 'power4.out',
            },
            'f',
          )
        })
      } catch (e) {
        console.log(e)
      }
    }

    bootstrapAsync().finally(() => {
      setIsLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Cursor isLoading={isLoading} />
      <section className={s.loader} ref={loaderRef} />
      <section className={`${s.loader} ${s.loader2}`} ref={loaderRef2} />
      <div className={`${s.app_container} app`}>
        <Header />
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
