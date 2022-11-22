import * as React from 'react'
import { motion } from 'framer-motion'

import s from './Header.module.scss'
import { MenuItem } from './MenuItem'

type NavProps = {
  toggle: Function
}

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
}
const itemIds = [0, 1, 2, 3, 4]

export const Navigation = ({ toggle }: NavProps) => (
  <motion.ul variants={variants} className={s.ul}>
    {itemIds.map((i) => (
      <MenuItem i={i} key={i} text={'Начать'} toggle={toggle} />
    ))}
  </motion.ul>
)
