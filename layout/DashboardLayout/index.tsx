'use client'

import { AntdContextHolder } from '@apps/split/lib/context'
import { Layout, Modal, message, notification } from 'antd'
import { ReactNode } from 'react'

import { HeaderNav } from './HeaderNav'
import { SideNav } from './SideNav'

import './DashboardLayout.css'

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
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
      <Layout hasSider style={{ height: '100vh', width: '100vw' }}>
        <SideNav />
        <Layout>
          <HeaderNav />
          <Layout.Content style={{ minHeight: 'calc(100vh - 72px)' }}>
            {messageContextHolder}
            {notificationContextHolder}
            {modalContextHolder}
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    </AntdContextHolder.Provider>
  )
}
