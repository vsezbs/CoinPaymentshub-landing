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
  toggle: Function
}

export const MenuItem = ({ text, i, toggle }: MenuItemProps) => {
  return (
    <motion.li className={s.li}>
      <motion.div
        variants={variants}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={s.li_link}
        onClick={() => toggle()}
      >
        {text}
      </motion.div>
    </motion.li>
  )
}
