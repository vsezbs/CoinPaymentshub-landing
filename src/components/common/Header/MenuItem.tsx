import * as React from 'react'
import { motion } from 'framer-motion'

import s from './Header.module.scss'

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
}

type MenuItemProps = {
  text: string
  i: number
}

export const MenuItem = ({ text, i }: MenuItemProps) => {
  return (
    <motion.li
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={s.li}
    >
      <div className={s.li_link}>{text}</div>
    </motion.li>
  )
}
