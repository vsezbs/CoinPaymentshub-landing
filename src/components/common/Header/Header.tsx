import React, { useContext } from 'react'
import { ReactComponent as LogoIcon } from 'images/icons/logo.svg'
import { Context } from 'components/app/IsMobile'

import MagnetButton from '../MagnetButton/MagnetButton'

import s from './Header.module.scss'

const Header = () => {
  const isMobile = useContext(Context)
  return (
    <header className={isMobile ? s.header_mobile : ''}>
      <div className={`${s.logo} logo`}>
        <LogoIcon />
      </div>
      {isMobile ? (
        <></>
      ) : (
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
