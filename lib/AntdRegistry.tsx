'use client'

import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs'
import type Entity from '@ant-design/cssinjs/es/Cache'
import { themeConfig } from '@apps/packages/theme'
import { ConfigProvider } from 'antd'
import dayjs from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import localeData from 'dayjs/plugin/localeData'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'
import weekday from 'dayjs/plugin/weekday'
import { useServerInsertedHTML } from 'next/navigation'
import { PropsWithChildren, ReactNode, useMemo } from 'react'

dayjs.extend(customParseFormat)
dayjs.extend(advancedFormat)
dayjs.extend(weekday)
dayjs.extend(localeData)
dayjs.extend(weekOfYear)
dayjs.extend(weekYear)

export const StyledComponentsRegistry = ({ children }: PropsWithChildren) => {
  const cache = useMemo<Entity>(() => createCache(), [])
  useServerInsertedHTML(() => <style id="antd" dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />)
  return <StyleProvider cache={cache}>{children}</StyleProvider>
}

export const AntdProvider = ({ children }: { children: ReactNode }) => {
  return (
    <StyledComponentsRegistry>
      <ConfigProvider theme={themeConfig}>{children}</ConfigProvider>
    </StyledComponentsRegistry>
  )
}
