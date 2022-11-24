/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import { Context } from 'components/app/IsMobile'
import React, { useContext, useEffect, useRef } from 'react'

import s from './Cursor.module.scss'

type CursorProps = {
  isLoading: boolean
}

const Cursor = ({ isLoading }: CursorProps) => {
  //   const dotRef = useRef<HTMLDivElement>(null)
  const isMobile = useContext(Context)
  const dotOutlineRef = useRef<HTMLDivElement>(null)
  const delay = 5

  const cursorVisible = useRef(true)
  const cursorEnlarged = useRef(false)

  const endX = useRef(window.innerWidth / 2)
  const endY = useRef(window.innerHeight / 2)
  const _x = useRef(0)
  const _y = useRef(0)

  const requestRef = useRef<any>(null)

  const toggleCursorVisibility = () => {
    if (dotOutlineRef.current) {
      if (cursorVisible.current) {
        // dotRef.current.style.opacity = '1'
        dotOutlineRef.current.style.opacity = '1'
      } else {
        // dotRef.current.style.opacity = '0'
        dotOutlineRef.current.style.opacity = '0'
      }
    }
  }

  const toggleCursorSize = () => {
    if (dotOutlineRef.current) {
      if (cursorEnlarged.current) {
        // dotRef.current.style.transform = 'translate(-50%, -50%) scale(0.75)'
        dotOutlineRef.current.style.transform = 'translate(-50%, -50%) scale(1.5)'
      } else {
        // dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
        dotOutlineRef.current.style.transform = 'translate(-50%, -50%) scale(1)'
      }
    }
  }

  const mouseOverEvent = () => {
    cursorEnlarged.current = true
    toggleCursorSize()
  }

  const mouseOutEvent = () => {
    cursorEnlarged.current = false
    toggleCursorSize()
  }

  const mouseEnterEvent = () => {
    cursorVisible.current = true
    toggleCursorVisibility()
  }

  const mouseLeaveEvent = () => {
    cursorVisible.current = false
    toggleCursorVisibility()
  }

  const mouseMoveEvent = (e: any) => {
    cursorVisible.current = true
    toggleCursorVisibility()

    endX.current = e.pageX
    endY.current = e.pageY

    // if (dotRef.current) {
    //   dotRef.current.style.top = endY.current + 'px'
    //   dotRef.current.style.left = endX.current + 'px'
    // }
  }

  const animateDotOutline = () => {
    _x.current += (endX.current - _x.current) / delay
    _y.current += (endY.current - _y.current) / delay

    if (dotOutlineRef.current) {
      dotOutlineRef.current.style.top = _y.current + 'px'
      dotOutlineRef.current.style.left = _x.current + 'px'
    }
    requestRef.current = requestAnimationFrame(animateDotOutline)
  }

  useEffect(() => {
    document.addEventListener('mousedown', mouseOverEvent)
    document.addEventListener('mouseup', mouseOutEvent)
    document.addEventListener('mousemove', mouseMoveEvent)
    document.addEventListener('mouseenter', mouseEnterEvent)
    document.addEventListener('mouseleave', mouseLeaveEvent)

    animateDotOutline()

    return () => {
      document.removeEventListener('mousedown', mouseOverEvent)
      document.removeEventListener('mouseup', mouseOutEvent)
      document.removeEventListener('mousemove', mouseMoveEvent)
      document.removeEventListener('mouseenter', mouseEnterEvent)
      document.removeEventListener('mouseleave', mouseLeaveEvent)

      cancelAnimationFrame(requestRef.current)
    }
  }, [])

  return isMobile ? <></> : <div className={`${s.dot_outline} cursor`} ref={dotOutlineRef}></div>
}

export default Cursor
