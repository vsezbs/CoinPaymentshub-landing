import React, { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scrollbar from 'smooth-scrollbar'
import MagnetButton from 'components/common/MagnetButton/MagnetButton'
import { AnimateBubble } from 'components/common/AnimateBubble/AnimateBubble'
import slidePink from 'images/slide-pink.png'
import slidePurple from 'images/slide-purple.png'
import slideBlue from 'images/slide-blue.png'

import tronImg from '../../../images/tron.png'
import ethImg from '../../../images/eth.png'
import binanceImg from '../../../images/binance.png'
import btcImg from '../../../images/btc.png'
import ltcImg from '../../../images/ltc.png'
import dashImg from '../../../images/dash.png'
import fingerImg from '../../../images/finger.png'
import sl from '../SliderPage/SliderPage.module.scss'

import s from './TestPage.module.scss'

gsap.registerPlugin(ScrollTrigger)

const TestMobilePage = () => {
  const scrollerRef = useRef<any>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)
  const circleRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = (e: any) => {
    if (circleRef?.current) {
      let parentOffset = circleRef.current.getBoundingClientRect()

      let relX = e.pageX - parentOffset.left
      let relY = e.pageY - parentOffset.top

      console.log('tut1')
      console.log('p', parentOffset)
      console.log('X', relX)
      console.log('Y', relY)
      circleRef.current.style.top = `${relY}`
      circleRef.current.style.left = `${relX}`
      circleRef.current.classList.remove(s.desplode_circle)
      circleRef.current.classList.add(s.explode_circle)
    }
  }

  const handleMouseLeave = (e: any) => {
    if (circleRef?.current) {
      let parentOffset = circleRef.current.getBoundingClientRect()

      let relX = e.pageX - parentOffset.left
      let relY = e.pageY - parentOffset.top

      console.log('tut2')
      console.log('p', parentOffset)
      console.log('X', relX)
      console.log('Y', relY)

      circleRef.current.style.top = `${relY}`
      circleRef.current.style.left = `${relX}`
      circleRef.current.classList.remove(s.explode_circle)
      circleRef.current.classList.add(s.desplode_circle)
    }
  }

  useEffect(() => {
    if (scrollerRef && scrollerRef.current) {
      let bodyScrollBar = Scrollbar.init(scrollerRef.current, {
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

      let ctx = gsap.context(() => {
        const firstTl = gsap.timeline({
          scrollTrigger: {
            trigger: '.one',
            scroller: '.scroller',
            start: () => 'top top',
            end: () => '+=2000px',
            pin: '.one',
            scrub: 0.5,
            // pinSpacing: false,
            snap: 0.1,
            invalidateOnRefresh: true,
          },
        })

        firstTl
          .fromTo(
            '.logo',
            { ease: 'none', opacity: 1 },
            { ease: 'none', opacity: 0, y: -10, delay: 0.5 },
            'li',
          )
          .fromTo(
            '.h1-wrapper',
            { ease: 'power.out', opacity: 1, zIndex: 1 },
            { ease: 'power.in', opacity: 1 },
            'li',
          )

          .fromTo(
            '.h1-wrapper',
            { opacity: 1 },
            {
              opacity: 1,
              onReverseComplete() {
                // circleRef.current.style.backgroundColor = 'antiquewhite'
              },
            },
          )
          .fromTo(
            '.h1-wrapper',
            { ease: 'power.out', opacity: 1, duration: 2 },
            { ease: 'power.in', opacity: 0, y: -30, duration: 2 },
            'h1',
          )
          .fromTo(
            '#canvas',
            { ease: 'power.out', opacity: 1 },
            { ease: 'power.in', opacity: 0.3 },
            'h1',
          )
          .fromTo(
            '.h2-wrapper',
            { opacity: 0, y: -100, duration: 2 },
            { opacity: 1, y: -110, delay: 1.5, duration: 2 },
            'h1',
          )

          .fromTo('.h2-wrapper', { opacity: 1 }, { opacity: 1, delay: 2 })

        gsap.to('.container', {
          scrollTrigger: {
            trigger: 'section.container',
            scroller: '.scroller',
            start: () => 'top 50%',
            onEnter: () => {
              gsap.to('body', {
                duration: 1,
                backgroundColor: '#F7F8FB',
              })
            },
            onLeaveBack: () => {
              gsap.to('body', { duration: 1, backgroundColor: '#FFEFFB' })
            },
            invalidateOnRefresh: true,
          },
        })
      })
      return () => ctx.revert()
    }
  }, [])

  return (
    <div>
      <div className={`scroller ${s.scroller}`} ref={scrollerRef}>
        <section className="one">
          <div className={`h1-wrapper ${s.h1_wrapper}`}>
            <div className={`title ${s.h1_title}`}>Принимайте платежи в криптовалюте</div>
            <div className={`subtitle ${s.h1_subtitle}`}>Анонимно. Безопасно. Проще.</div>
            <div className={s.button}>
              <MagnetButton
                onClick={() => {
                  console.log('click')
                }}
                buttonClass={s.btn}
              >
                Попробовать
              </MagnetButton>
            </div>
          </div>
          <div className={`h2-wrapper ${s.h1_wrapper}`}>
            <div className={`${s.h1_title} ${s.h2_title}`}>
              Самые популярные <br /> криптовалюты уже <br /> доступны
            </div>
            <div className={s.icons}>
              <div className={s.icon}>
                <img src={tronImg} alt="" />
              </div>
              <div className={`${s.icon} ${s.eth}`}>
                <img src={ethImg} alt="" />
              </div>
              <div className={s.icon}>
                <img src={binanceImg} alt="" />
              </div>
              <div className={`${s.icon} ${s.btc}`}>
                <img src={btcImg} alt="" />
              </div>
              <div className={`${s.icon} ${s.ltc}`}>
                <img src={ltcImg} alt="" />
              </div>
              <div className={s.icon}>
                <img src={dashImg} alt="" />
              </div>
            </div>
          </div>
          <AnimateBubble ref={bubbleRef} />
        </section>

        <section>
          <div className={`${s.slide_mobile} ${s.slide_purple}`}>
            <div className={s.slide_img}>
              <img src={slidePurple} alt="" />
            </div>
            <div className={s.slide_title}>Возможность создавать статические кошельки</div>
            <div className={s.slide_subtitle}>
              Доступ только у владельцев проектов, можно в любое время экспортировать приватный ключ
            </div>
            <div className={s.slide_button}>
              <MagnetButton
                onClick={() => {
                  console.log('click')
                }}
                buttonClass={s.btn}
              >
                Попробовать
              </MagnetButton>
            </div>
          </div>
          <div className={`${s.slide_mobile} ${s.slide_blue}`}>
            <div className={s.slide_img}>
              <img src={slideBlue} alt="" />
            </div>
            <div className={s.slide_title}>Возможность создавать статические кошельки</div>
            <div className={s.slide_subtitle}>
              Доступ только у владельцев проектов, можно в любое время экспортировать приватный ключ
            </div>
            <div className={s.slide_button}>
              <MagnetButton
                onClick={() => {
                  console.log('click')
                }}
                buttonClass={s.btn}
              >
                Попробовать
              </MagnetButton>
            </div>
          </div>
          <div className={`${s.slide_mobile} ${s.slide_pink}`}>
            <div className={s.slide_img}>
              <img src={slidePink} alt="" />
            </div>
            <div className={s.slide_title}>Возможность создавать статические кошельки</div>
            <div className={s.slide_subtitle}>
              Доступ только у владельцев проектов, можно в любое время экспортировать приватный ключ
            </div>
            <div className={s.slide_button}>
              <MagnetButton
                onClick={() => {
                  console.log('click')
                }}
                buttonClass={s.btn}
              >
                Попробовать
              </MagnetButton>
            </div>
          </div>
          <div className={s.horizontal_mobile}>
            <div className={s.horizontal_title}>Начать принимать криптоплатежи</div>
            <div className={s.horizontal_subtitle}>
              Легко настраивайте СoinPaymentshub на самых популярных платформах электронной
              коммерции.
            </div>
            <div className={s.horizontal_items}>
              <div className={s.horizontal_item}>
                <div className={s.item_title}>
                  Возможность добавлять свои токены сетей и процессить их
                </div>
                <div className={s.item_subtitle}>
                  Доступ только у владельцев проектов, можно в любое время экспортировать приватный
                  ключ
                </div>
              </div>
              <div className={s.horizontal_item}>
                <div className={s.item_title}>Возможность загружать свои кошельки</div>
                <div className={s.item_subtitle}>
                  Доступ только у владельцев проектов, можно в любое время экспортировать приватный
                  ключ
                </div>
              </div>
              <div className={s.horizontal_item}>
                <div className={s.item_title}>
                  Возможность принимать недоплаты и привязать кошельки по клиентам
                </div>
                <div className={s.item_subtitle}>
                  Доступ только у владельцев проектов, можно в любое время экспортировать приватный
                  ключ
                </div>
              </div>
            </div>
          </div>
          <div className={s.price}>
            <div className={s.title}>Стоимость и условия</div>
            <div className={s.content}>
              <div className={s.left}>
                <div className={s.content_title}>Что входит в тарифный план</div>
                <ul className={s.content_list}>
                  <li>10 000 транзакций</li>
                  <li>Личный проектный кошелек</li>
                  <li>Поддерживаемые криптовалюты: btc, bcash, eth, etc</li>
                </ul>
                <div className={s.content_bottom_title}>
                  500 USDT <span>в месяц</span>
                </div>
                <div className={s.content_button}>
                  <MagnetButton
                    onClick={() => {
                      console.log('click')
                    }}
                    buttonClass={s.content_btn}
                  >
                    Попробовать
                  </MagnetButton>
                </div>
              </div>
              <div className={s.right}>
                <div className={s.content_title}>Дополнительно:</div>
                <div className={s.content_bottom_title}>0.05 USDT</div>
                <div className={s.content_bottom_subtitle}>За входящую успешную транзакцию</div>
                <div className={s.content_bottom_title}>0.05 USDT</div>
                <div className={s.content_bottom_subtitle}>За исходящую успешную транзакцию</div>
              </div>
            </div>
          </div>
          <div className={s.connect}>
            <div className={s.connect_circle_wrapper}>
              <div className={s.connect_circle} ref={circleRef} />
              <div
                className={s.connect_circle_inner}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className={s.connect_circle_title}>Подключить</div>
                <div className={s.connect_circle_icon}>
                  <img src={fingerImg} alt="" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* 
        <section className={s.footer}>
          <div className={s.footer_wrapper}>
            <div className={s.footer_top}>
              <div className={s.footer_top_nav}>
                <div className={s.link}>Коинплатежи</div>
                <div className={s.link}>Сборы/Цены</div>
                <div className={s.link}>Поддерживаемые валюты</div>
              </div>
              <div className={s.footer_top_nav}>
                <div className={s.link}>Ресурсы</div>
                <div className={s.link}>Для продавцов</div>
                <div className={s.link}>Руководство по интеграции</div>
                <div className={s.link}>Директория магазинов</div>
                <div className={s.link}>Часто задаваемые вопросы</div>
              </div>
              <div className={s.footer_top_nav}>
                <div className={s.link}>Контакты</div>
                <div className={s.link}>Поддержка</div>
              </div>
              <div className={s.footer_top_nav}>
                <div className={s.link}>Политика сайта </div>
                <div className={s.link}>Юрисдикции с ограниченным доступом</div>
                <div className={s.link}>Пользовательское соглашение</div>
                <div className={s.link}>Политика приватности</div>
              </div>
            </div>
            <div className={s.footer_bottom}>
              <div className={s.footer_bottom_left}>
                <div className={s.footer_copy}>
                  2022 <span>CoinPaymentshub</span> <br /> Все права защищены
                </div>
              </div>
              <div className={s.footer_bottom_right}>
                <div className={s.footer_social}>
                  <div className={s.footer_icon}>
                    <VkIcon />
                  </div>
                  <div className={s.footer_icon}>
                    <IgIcon />
                  </div>
                  <div className={s.footer_icon}>
                    <TgIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </div>
    </div>
  )
}

export default TestMobilePage
