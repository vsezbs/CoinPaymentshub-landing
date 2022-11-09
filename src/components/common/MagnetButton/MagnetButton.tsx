import React, { useRef } from 'react'
import gsap from 'gsap'

import s from './MagnetButton.module.scss'

type MagnetButtonProps = {
  children: React.ReactNode
  containerClass?: string
  buttonClass?: string
  speed?: number
  tollerance?: number
  scale?: number
  debug?: boolean
  borderRadius?: number | string
  textRepeat?: boolean
  onClick: () => void
}

const MagnetButton = ({
  children,
  containerClass,
  buttonClass,
  speed = 0.3,
  tollerance = 0.8,
  scale = 1.5,
  debug = false,
  borderRadius = 30,
  onClick,
  textRepeat,
  ...props
}: MagnetButtonProps) => {
  const $root = useRef<HTMLDivElement>(null)
  const $item = useRef<HTMLDivElement>(null)
  const $hover = useRef<HTMLDivElement>(null)
  const rootBound = useRef<any>(null)
  const itemBound = useRef<any>(null)
  const diffBound = useRef({ x: 0, y: 0 })

  const handleMouseEnter = () => {
    gsap.killTweensOf($item.current)
    gsap.set($hover.current, {
      scale: scale,
      borderRadius,
      background: debug ? 'rgba(0, 125, 255, .4)' : 'transparent',
    })

    rootBound.current = $root.current?.getBoundingClientRect()
    itemBound.current = $item.current?.getBoundingClientRect()
    diffBound.current.x = (rootBound.current?.width * scale - rootBound.current.width) / 2
    diffBound.current.y = (rootBound.current?.height * scale - rootBound.current.height) / 2
  }

  const handleMouseLeave = () => {
    gsap.killTweensOf($item.current)
    gsap.to($item.current, {
      x: 0,
      y: 0,
      ease: 'elastic.out(0.4, .4)',
      duration: 0.5,
    })
    gsap.set($hover.current, {
      scale: 1,
    })
  }

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement> & React.TouchEvent<HTMLDivElement>,
  ) => {
    const x = e.clientX || e.touches[0].clientX
    const y = e.clientY || e.touches[0].clientY

    const maxX = ((rootBound.current.width - itemBound.current.width) / 2) * tollerance
    const maxY = ((rootBound.current.height - itemBound.current.height) / 2) * tollerance

    const newX = gsap.utils.mapRange(
      0,
      rootBound.current.width * scale,
      -maxX,
      maxX,
      x - rootBound.current.x + diffBound.current.x,
    )

    const newY = gsap.utils.mapRange(
      0,
      rootBound.current.height * scale,
      -maxY,
      maxY,
      y - rootBound.current.y + diffBound.current.y,
    )

    gsap.killTweensOf($item.current)
    gsap.to($item.current, {
      x: newX,
      y: newY,
      ease: 'power3.out',
      duration: speed,
    })
  }

  return (
    <div
      ref={$root}
      className={` ${s.button_container} ${containerClass}`}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onTouchStart={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleMouseLeave}
      onClick={onClick}
      {...props}
    >
      <div ref={$item} className={`${s.button} ${buttonClass}`}>
        <span className={`${textRepeat ? s.repeat : ''}`}>{children}</span>
      </div>

      <span ref={$hover} className={`${s.hover} `} />
    </div>
  )
}

export default MagnetButton
