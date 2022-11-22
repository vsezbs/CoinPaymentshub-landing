import React, { useContext, useEffect, useRef, useState } from 'react'
import { ReactComponent as LogoIcon } from 'images/icons/logo.svg'
import { Context } from 'components/app/IsMobile'
import { motion, useCycle } from 'framer-motion'

import MagnetButton from '../MagnetButton/MagnetButton'

import s from './Header.module.scss'
import { MenuToggle } from './Burger'
import { Navigation } from './Navigation'

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 90% 40px)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(0px at 90% 40px)',
    transition: {
      delay: 0.5,
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
}

const Header = () => {
  const isMobile = useContext(Context)
  const [isOpen, toggleOpen] = useCycle(false, true)
  const containerRef = useRef(null)
  const [scroll, setScroll] = useState(true)
  const onStart = () => {
    setScroll(false)
  }

  const onComplete = () => {
    if (isOpen) {
      setScroll(false)
    } else {
      setScroll(true)
    }
  }
  return (
    <header className={isMobile ? s.header_mobile : ''}>
      <div className={`${s.logo} logo`}>
        <LogoIcon />
      </div>
      {isMobile ? (
        <motion.nav
          initial={false}
          animate={isOpen ? 'open' : 'closed'}
          custom="100%"
          ref={containerRef}
          className={scroll ? s.active : ''}
          onAnimationStart={onStart}
          onAnimationComplete={onComplete}
        >
          <motion.div className={`${s.background} ${scroll ? s.active : ''}`} variants={sidebar} />
          <Navigation toggle={toggleOpen} />
          <MenuToggle toggle={() => toggleOpen()} />
        </motion.nav>
      ) : (
        // <></>
        <ul className={s.nav_list}>
          <li className="hide_li">Начать</li>
          <li className="hide_li">Начать</li>
          <li className="hide_li">Начать</li>
          <li className="hide_li">Начать</li>
          <MagnetButton
            textRepeat
            onClick={() => {
              console.log('click')
            }}
          >
            Начать
          </MagnetButton>
        </ul>
      )}
    </header>
  )
}

export default Header
