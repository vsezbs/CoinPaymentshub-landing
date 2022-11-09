import React from 'react'
import { ReactComponent as LogoIcon } from 'images/icons/logo.svg'

import MagnetButton from '../MagnetButton/MagnetButton'

import s from './Header.module.scss'

const Header = () => {
  return (
    <header>
      <div className={s.logo}>
        <LogoIcon />
      </div>
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
    </header>
  )
}

export default Header
