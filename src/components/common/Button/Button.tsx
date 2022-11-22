import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

import fingerImg from '../../../images/finger.png'

import s from './Button.module.scss'

type ButtonProps = {
  btnClassName?: string
  textClassName?: string
  text?: string
  isCircle?: boolean
  isIcon?: boolean
}

const Button = ({
  btnClassName,
  textClassName,
  text = 'Подключиться',
  isCircle = true,
  isIcon = true,
}: ButtonProps) => {
  const buttonRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLSpanElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (
      buttonRef &&
      buttonRef.current &&
      circleRef &&
      circleRef.current &&
      textRef &&
      textRef.current
    ) {
      let btn = buttonRef.current
      let circle = circleRef.current
      let circleText = textRef.current
      let ctx = gsap.context(() => {
        gsap.set(circle, {
          scale: 0.2,
          opacity: 0,
        })

        let tl = gsap.timeline({ paused: true })
        tl.to(btn, {
          duration: 0.05,
          boxShadow: '0px 25px 50px #33a9ff',
          ease: 'quad.out',
        })
          .to(
            circle,
            {
              scale: 3,
              opacity: 1,
              background: '#0094FF',
            },
            'text',
          )
          .to(
            circleText,
            {
              color: '#ffffff',
            },
            'text',
          )

        function setPosition(e: any) {
          var bounds = e.target.getBoundingClientRect()
          var x = e.clientX - bounds.left
          var y = e.clientY - bounds.top

          console.log('x:', x)
          console.log('y:', y)
          console.log('bounds', bounds)

          gsap.set(circle, {
            left: `${x}px`,
            top: `${y}px`,
          })
        }
        btn.addEventListener('mouseenter', (e) => {
          setPosition(e)
          tl.play()
        })

        btn.addEventListener('mouseout', (e) => {
          setPosition(e)
          tl.reverse()
        })
      })

      return () => ctx.revert()
    }
  }, [])

  return (
    <div
      className={`${s.button} ${btnClassName || ''} ${isCircle ? s.circle : ''}`}
      ref={buttonRef}
    >
      <span ref={circleRef} />
      <div className={s.wrapper}>
        <div className={`${s.button_text} ${textClassName || ''}`} ref={textRef}>
          {text}
        </div>
        {isIcon ? (
          <div className={s.icon}>
            <img src={fingerImg} alt="" />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default Button
