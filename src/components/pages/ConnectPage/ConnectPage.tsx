import MagnetButton from 'components/common/MagnetButton/MagnetButton'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scrollbar from 'smooth-scrollbar'
gsap.registerPlugin(ScrollTrigger)

import s from './ConnectPage.module.scss'

const ConnectPage = () => {
  const sectionRef = useRef<any>(null)

  useEffect(() => {
    let bodyScrollBar = Scrollbar.init(document.body, {
      damping: 0.1,
      delegateTo: document,
    })
    ScrollTrigger.scrollerProxy('.scroller', {
      scrollTop(value) {
        if (arguments.length) {
          //@ts-ignore
          bodyScrollBar.scrollTop = value
        }
        return bodyScrollBar.scrollTop
      },
    })
    bodyScrollBar.addListener(ScrollTrigger.update)

    gsap.set('.panel', { zIndex: (i, target, targets) => targets.length - i })

    const panels = gsap.utils.toArray('.panel')

    panels.forEach((panel: any, i) => {
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: 'section',
          scroller: '.scroller',
          start: () => 'top -' + window.innerHeight * (i + 0.5),
          end: () => '+=' + window.innerHeight,
          scrub: true,
          toggleActions: 'play none reverse none',
          invalidateOnRefresh: true,
        },
      })

      tl.to(panel, { height: 0 })
    })

    gsap.set('.left-block', { zIndex: (i, target, targets) => targets.length - i })

    const leftBlocks = gsap.utils.toArray('.left-block')

    leftBlocks.forEach((leftblock: any, i) => {
      var tl = gsap.timeline({
        scrollTrigger: {
          trigger: 'section',
          scroller: '.scroller',
          start: () => 'top -' + window.innerHeight * i,
          end: () => '+=' + window.innerHeight,
          scrub: true,
          toggleActions: 'play none reverse none',
          invalidateOnRefresh: true,
        },
      })

      tl.to(leftblock, { duration: 0.33, opacity: 1, y: '50%' }).to(
        leftblock,
        { duration: 0.33, opacity: 0, y: '0%' },
        0.66,
      )
    })

    ScrollTrigger.create({
      trigger: 'section',
      scroller: '.scroller',
      scrub: true,
      markers: true,
      pin: true,
      start: () => 'top top',
      end: () => '+=' + (leftBlocks.length + 1) * window.innerHeight,
      invalidateOnRefresh: true,
    })
  }, [])

  return (
    <section className={`${s.section} scroller`} ref={sectionRef} data-scrollbar>
      <div className={s.left_wrap}>
        <div className={`${s.left_block} left-block`}>
          <div className={s.title}>Возможность создавать статические кошельки</div>
          <div className={s.subtitle}>
            Доступ только у владельцев проектов, можно в любое время экспортировать приватный ключ
          </div>
          <div className={s.button}>
            <MagnetButton
              onClick={() => {
                console.log('click')
              }}
            >
              Попробовать
            </MagnetButton>
          </div>
        </div>
        <div className={`${s.left_block} left-block`}>
          <div className={s.title}>Нет понятия баланса</div>
          <div className={s.subtitle}>Мониторьте баланс каждого отдельного кошелька</div>
          <div className={s.button}>
            <MagnetButton
              onClick={() => {
                console.log('click')
              }}
            >
              Попробовать
            </MagnetButton>
          </div>
        </div>
        <div className={`${s.left_block} left-block`}>
          <div className={s.title}>Все кошельки зашифрованы</div>
          <div className={s.subtitle}>
            Доступ только у владельцев проектов, можно в любое время экспортировать приватный ключ
          </div>
          <div className={s.button}>
            <MagnetButton
              onClick={() => {
                console.log('click')
              }}
            >
              Попробовать
            </MagnetButton>
          </div>
        </div>
      </div>
      <div className={s.right_wrap}>
        <div className={`${s.panel} panel ${s.panel_purple}`}></div>
        <div className={`${s.panel} panel ${s.panel_blue}`}></div>
        <div className={`${s.panel} panel ${s.panel_pink}`}></div>
      </div>
    </section>
  )
}

export default ConnectPage
