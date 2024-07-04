'use client'

import EmptyPlaceholder from '@apps/assets/images/empty-placeholder.png'
import Image, { ImageProps, StaticImageData } from 'next/image'
import { useEffect, useState } from 'react'

interface StaticRequire {
  default: StaticImageData
}
type StaticImport = StaticRequire | StaticImageData
type ImageFallbackProps = {
  fallbackSrc?: string | StaticImport
} & ImageProps

export const ImageFallback = ({ src, fallbackSrc, alt, ...rest }: ImageFallbackProps) => {
  const [imgSrc, set_imgSrc] = useState(src)

  useEffect(() => {
    if (src) {
      set_imgSrc(src)
      return
    }
    set_imgSrc(EmptyPlaceholder)
  }, [src])

  if (!imgSrc) return null

  return (
    <Image
      alt={alt || 'image'}
      src={imgSrc}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          set_imgSrc(fallbackSrc ?? EmptyPlaceholder)
        }
      }}
      onError={() => {
        set_imgSrc(fallbackSrc ?? EmptyPlaceholder)
      }}
      {...rest}
    />
  )
}
