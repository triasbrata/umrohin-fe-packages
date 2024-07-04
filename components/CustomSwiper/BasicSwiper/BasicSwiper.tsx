'use client'

import { Button } from 'antd'
import clsx from 'clsx'
import { NavArrowLeft, NavArrowRight } from 'iconoir-react'
import { useMemo, useState } from 'react'
import { Scrollbar } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperProps, useSwiper } from 'swiper/react'

import styles from './BasicSwiper.module.css'

import 'swiper/css'
import 'swiper/css/scrollbar'

type SlideToType = {
  (swiper: SwiperClass): {
    index?: number
    speed?: number
    runCallbacks?: boolean
  }
}

type BasicSwiperButton = {
  slideTo?: SlideToType
  dragContent?: number
}

export const BasicSwiperPrevButton = (props?: BasicSwiperButton) => {
  const { slideTo } = props ?? {}
  const swiper = useSwiper()

  return (
    <Button
      type="primary"
      className={clsx(
        styles.customSwiperPrevButton,
        'flex items-center justify-center border border-[#F6F8FA] rounded-full shadow-sm bg-white h-10 w-10 p-0'
      )}
      onClick={() => {
        swiper.slideTo(
          slideTo?.(swiper)?.index ?? swiper.activeIndex - 5,
          slideTo?.(swiper).speed,
          slideTo?.(swiper).runCallbacks
        )
      }}
    >
      <NavArrowLeft height={24} width={24} color="#000000" />
    </Button>
  )
}

export const BasicSwiperNextButton = (props?: BasicSwiperButton) => {
  const { slideTo } = props ?? {}
  const swiper = useSwiper()

  return (
    <Button
      type="primary"
      className={clsx(
        styles.customSwiperNextButton,
        'flex items-center justify-center border border-[#F6F8FA] rounded-full shadow-sm bg-white h-10 w-10 p-0'
      )}
      onClick={() => {
        swiper.slideTo(
          slideTo?.(swiper).index ?? swiper.activeIndex + 5,
          slideTo?.(swiper).speed,
          slideTo?.(swiper).runCallbacks
        )
      }}
    >
      <NavArrowRight height={24} width={24} color="#000000" />
    </Button>
  )
}

type BasicSwiperProps = SwiperProps & {
  prevButtonProps?: BasicSwiperButton
  nextButtonProps?: BasicSwiperButton
  dragContent?: number
}

export const BasicSwiper = (props: BasicSwiperProps) => {
  const { children, className, prevButtonProps, nextButtonProps, onSlideChange, ...restProps } = props
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const slidesPerView = useMemo(() => props.dragContent ?? 4, [props.dragContent])

  return (
    <Swiper
      slidesPerView={slidesPerView}
      spaceBetween={24}
      scrollbar={{ hide: false, dragSize: 70 }}
      modules={[Scrollbar]}
      {...restProps}
      onSlideChange={(swiper) => {
        setActiveIndex(swiper.activeIndex)
        onSlideChange?.(swiper)
      }}
      className={clsx(styles.customSwiper, className)}
    >
      {children}
      {activeIndex > 0 && <BasicSwiperPrevButton {...prevButtonProps} />}
      <BasicSwiperNextButton {...nextButtonProps} />
    </Swiper>
  )
}
