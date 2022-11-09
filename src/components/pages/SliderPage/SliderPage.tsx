import React from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef } from 'react'
import Scrollbar from 'smooth-scrollbar'
gsap.registerPlugin(ScrollTrigger)

import s from './SliderPage.module.scss'

const SliderPage = () => {
  const horizontalRef = useRef<any>()

  useEffect(() => {
    if (horizontalRef && horizontalRef.current) {
      const horizontalSection = horizontalRef.current

      console.log('hor', horizontalSection.scrollWidth)

      let ctx = gsap.context(() => {
        gsap.to('.horizontal', {
          x: () => horizontalSection.scrollWidth * -1,
          xPercent: 100,
          scrollTrigger: {
            trigger: horizontalSection,
            start: 'center center',
            end: `+=${horizontalSection.scrollWidth}`,
            pin: '.container',
            snap: 2 / horizontalSection.scrollWidth,
            scrub: true,
            markers: true,
            invalidateOnRefresh: true,
          },
        })
      })
      return () => ctx.revert()
    }
  }, [])
  return (
    <section className={`container ${s.container}`}>
      <div className={`horizontal ${s.horizontal}`} ref={horizontalRef}>
        <section>content starting horizontal</section>
        <section>next slide in horizontal</section>
        <section>next slide in horizontal</section>
      </div>
    </section>
  )
}

export default SliderPage
