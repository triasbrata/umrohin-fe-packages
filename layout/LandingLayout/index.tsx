'use client'

import { AntdContextHolder } from '@apps/packages/lib/context'
import { Modal, message, notification } from 'antd'
import { ReactNode } from 'react'

export const LandingLayout = ({ children }: { children: ReactNode }) => {
  const [notificationApi, notificationContextHolder] = notification.useNotification()
  const [messageApi, messageContextHolder] = message.useMessage()
  const [modalApi, modalContextHolder] = Modal.useModal()

  const antdContextHolderValue = {
    antdMessage: messageApi,
    antdModal: modalApi,
    antdNotification: notificationApi,
  }

  return (
    <AntdContextHolder.Provider value={antdContextHolderValue}>
      {messageContextHolder}
      {notificationContextHolder}
      {modalContextHolder}
      {children}
    </AntdContextHolder.Provider>
  )
}
