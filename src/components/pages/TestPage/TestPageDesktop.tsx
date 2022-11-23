import React, { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Scrollbar from 'smooth-scrollbar'
import MagnetButton from 'components/common/MagnetButton/MagnetButton'
import { ReactComponent as VkIcon } from 'images/icons/vk.svg'
import { ReactComponent as IgIcon } from 'images/icons/ig.svg'
import { ReactComponent as TgIcon } from 'images/icons/tg.svg'
import { AnimateBubble } from 'components/common/AnimateBubble/AnimateBubble'
import Button from 'components/common/Button/Button'
import coinImg from 'images/coin.png'
import upImg from 'images/up.png'
import moneyImg from 'images/money.png'

import tronImg from '../../../images/tron.png'
import ethImg from '../../../images/eth.png'
import binanceImg from '../../../images/binance.png'
import btcImg from '../../../images/btc.png'
import ltcImg from '../../../images/ltc.png'
import dashImg from '../../../images/dash.png'
import sl from '../SliderPage/SliderPage.module.scss'

import s from './TestPage.module.scss'

gsap.registerPlugin(ScrollTrigger)

const TestPageDesktop = () => {
  const scrollerRef = useRef<any>(null)
  const horizontalRef = useRef<any>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)

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
            end: () => '+=1000px',
            pin: '.one',
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        })

        firstTl
          .fromTo(
            '.hide_li',
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
            '#canvas',
            {
              y: 0,
              scale: 1,
              ease: 'power.out',
            },
            {
              ease: 'power.in',
              y: '-55vh',
              scale: 0.8,
              duration: 5,
              onComplete() {
                // circleRef.current.style.backgroundColor = '#0094FF'
              },
              onReverseComplete() {
                // circleRef.current.style.backgroundColor = 'antiquewhite'
              },
            },
            'circle',
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
            { ease: 'power.in', opacity: 0.6 },
            'h1',
          )
          .fromTo(
            '.h2-wrapper',
            { opacity: 0, y: -110, duration: 2 },
            { opacity: 1, y: -120, delay: 1.5, duration: 2 },
            'h1',
          )

          .fromTo('.h2-wrapper', { opacity: 1 }, { opacity: 1, delay: 2 })

        gsap.set('.panel', {
          zIndex: (i, target, targets) => targets.length - i,
        })
        const colors = ['#F5EBFF', '#EEF8FF', '#FFEFFB']

        const images = gsap.utils.toArray('.panel:not(.orange)')

        images.forEach((image: any, i) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: 'section.black',
              scroller: '.scroller',
              start: () => 'top -' + window.innerHeight * i,
              end: () => '+=' + window.innerHeight,
              scrub: true,
              toggleActions: 'play none reverse none',
              invalidateOnRefresh: true,
            },
          })

          tl.fromTo(
            image,
            {
              height: () => {
                return '100%'
              },
            },
            {
              height: () => {
                return '0%'
              },
              ease: 'none',
            },
          )
          ScrollTrigger.create({
            trigger: 'section.black',
            scroller: '.scroller',
            start: () => 'top -' + (window.innerHeight * i + window.innerHeight * 0.5),
            end: () => 'bottom 50%',
            onEnter: () => {
              gsap.to('body', { duration: 0.5, backgroundColor: colors[i + 1], overwrite: 'auto' })
            },
            onLeaveBack: () => {
              gsap.to('body', { duration: 0.5, backgroundColor: colors[i], overwrite: 'auto' })
            },
            invalidateOnRefresh: true,
          })
        })

        gsap.to('.black', {
          scrollTrigger: {
            trigger: 'section.black',
            scroller: '.scroller',
            start: () => 'top 50%',
            onEnter: () => {
              gsap.to('body', {
                duration: 1,
                backgroundColor: '#F5EBFF',
              })
            },
            onLeaveBack: () => {
              gsap.to('body', { duration: 1, backgroundColor: '#ffffff' })
            },
            invalidateOnRefresh: true,
          },
        })

        const horizontalSection = horizontalRef.current

        gsap.to('.horizontal', {
          x: () => horizontalSection.scrollWidth * -1,
          xPercent: 100,
          scrollTrigger: {
            trigger: '.container',
            scroller: '.scroller',
            start: 'center center',
            end: `+=${horizontalSection.scrollWidth}`,
            pin: '.container',
            snap: 5 / horizontalSection.scrollWidth,
            scrub: true,
            // markers: true,
            invalidateOnRefresh: true,
          },
        })

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

        ScrollTrigger.create({
          trigger: 'section.black',
          scroller: '.scroller',
          pin: '.p-wrap',
          start: () => 'top top',
          end: () => '+=' + images.length * window.innerHeight,
          invalidateOnRefresh: true,
        })

        const links = gsap.utils.toArray('.link')

        links.forEach((link: any) => {
          link.addEventListener('mouseover', () => {
            gsap.to('.cursor', {
              scale: 2,
              autoAlpha: 1,
              border: '1px solid #ffffff',
              background: '#ffffff',
              mixBlendMode: 'difference',
            })
          })
          link.addEventListener('mouseout', () => {
            gsap.to('.cursor', {
              scale: 1,
              autoAlpha: 1,
              border: 'none',
              background: '#000000',
              mixBlendMode: 'normal',
            })
          })
          link.addEventListener('mousedown', () => {
            gsap.to('.cursor', {
              scale: 1,
              autoAlpha: 1,
              border: 'none',
              background: '#000000',
              mixBlendMode: 'normal',
            })
          })
          link.addEventListener('mouseup', () => {
            gsap.to('.cursor', {
              scale: 1,
              autoAlpha: 1,
              border: 'none',
              background: '#000000',
              mixBlendMode: 'normal',
            })
          })
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
              Самые популярные <br /> криптовалюты уже доступны
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

        <section className={`black ${s.black}`}>
          <div className={`text-wrap ${s.text_wrap}`}>
            <div className={`text-wrapper ${s.text_wrapper}`}>
              <div className={`panel-text blue-text ${s.panel_text}`}>
                <div className={s.left_block}>
                  <div className={s.title}>Возможность создавать статические кошельки</div>
                  <div className={s.subtitle}>
                    Доступ только у владельцев проектов, можно в любое время экспортировать
                    приватный ключ
                  </div>
                  <div className={s.button}>
                    <MagnetButton
                      onClick={() => {
                        console.log('click')
                      }}
                      buttonClass={`${s.btn} ${s.blue_btn} `}
                    >
                      Попробовать
                    </MagnetButton>
                  </div>
                </div>
              </div>
              <div className={`panel-text red-text ${s.panel_text} ${s.text}`}>
                <div className={s.left_block}>
                  <div className={s.title}>Нет понятие баланса</div>
                  <div className={s.subtitle}>Мониторьте баланс каждого отдельного кошелька</div>
                  <div className={s.button}>
                    <MagnetButton
                      onClick={() => {
                        console.log('click')
                      }}
                      buttonClass={`${s.btn} ${s.red_btn}`}
                    >
                      Попробовать
                    </MagnetButton>
                  </div>
                </div>
              </div>
              <div className={`panel-text orange-text ${s.panel_text} ${s.text}`}>
                <div className={s.left_block}>
                  <div className={s.title}>Все кошельки зашифрованы</div>
                  <div className={s.subtitle}>
                    Доступ только у владельцев проектов, можно в любое время экспортировать
                    приватный ключ
                  </div>
                  <div className={s.button}>
                    <MagnetButton
                      onClick={() => {
                        console.log('click')
                      }}
                      buttonClass={`${s.btn} ${s.orange_btn}`}
                    >
                      Попробовать
                    </MagnetButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-wrap ${s.p_wrap}`}>
            <div className={`panel blue ${s.panel} ${s.blue} `}></div>
            <div className={`panel red ${s.panel} ${s.red}`}></div>
            <div className={`panel orange ${s.panel} ${s.orange}`}></div>
          </div>
        </section>

        <section className={`container ${sl.container}`}>
          {/* <div className={sl.slider_title}>kek</div> */}
          <div className={`horizontal ${sl.horizontal}`} ref={horizontalRef}>
            <section>
              <div className={s.slide}>
                <div className={s.slide_icon}>
                  <img src={coinImg} alt="" />
                </div>
                <div className={s.slide_title}>
                  Возможность добавлять <br /> свои токены сетей <br /> и процессить их
                </div>
                <div className={s.slide_text}>
                  Доступ только у владельцев проектов, можно в любое время экспортировать приватный
                  ключ
                </div>
              </div>
            </section>
            <section>
              <div className={s.slide}>
                <div className={s.slide_icon}>
                  <img src={upImg} alt="" />
                </div>
                <div className={s.slide_title}>
                  Возможность загружать <br /> свои кошельки
                </div>
                <div className={s.slide_text}>
                  Доступ только у владельцев проектов, можно в любое время экспортировать приватный
                  ключ
                </div>
              </div>
            </section>
            <section>
              <div className={s.slide}>
                <div className={s.slide_icon}>
                  <img src={moneyImg} alt="" />
                </div>
                <div className={s.slide_title}>
                  Возможность принимать недоплаты и привязать кошельки по клиентам
                </div>
                <div className={s.slide_text}>
                  Доступ только у владельцев проектов, можно в любое время экспортировать приватный
                  ключ
                </div>
              </div>
            </section>
          </div>
        </section>

        <section id="price" className={s.price}>
          <div>
            <div className={s.title}>Стоимость и условия подключения</div>
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
        </section>
        <section className={s.connect}>
          <div>
            <Button />
          </div>
        </section>
        <section className={s.footer}>
          <div className={s.footer_wrapper}>
            <div className={s.footer_top}>
              <div className={s.footer_top_nav}>
                <div className={`${s.link} link`}>Коинплатежи</div>
                <div className={`${s.link} link`}>Сборы/Цены</div>
                <div className={`${s.link} link`}>Поддерживаемые валюты</div>
              </div>
              <div className={s.footer_top_nav}>
                <div className={`${s.link} link`}>Ресурсы</div>
                <div className={`${s.link} link`}>Для продавцов</div>
                <div className={`${s.link} link`}>Руководство по интеграции</div>
                <div className={`${s.link} link`}>Директория магазинов</div>
                <div className={`${s.link} link`}>Часто задаваемые вопросы</div>
              </div>
              <div className={s.footer_top_nav}>
                <div className={`${s.link} link`}>Контакты</div>
                <div className={`${s.link} link`}>Поддержка</div>
              </div>
              <div className={s.footer_top_nav}>
                <div className={`${s.link} link`}>Политика сайта </div>
                <div className={`${s.link} link`}>Юрисдикции с ограниченным доступом</div>
                <div className={`${s.link} link`}>Пользовательское соглашение</div>
                <div className={`${s.link} link`}>Политика приватности</div>
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
                  <div className={`${s.footer_icon} link`}>
                    <VkIcon />
                  </div>
                  <div className={`${s.footer_icon} link`}>
                    <IgIcon />
                  </div>
                  <div className={`${s.footer_icon} link`}>
                    <TgIcon />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default TestPageDesktop
