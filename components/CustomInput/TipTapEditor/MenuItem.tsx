import { Button } from 'antd'
import React, { ReactNode } from 'react'

import styles from './MenuItem.module.css'

export type TipTapMenuItemType = {
  icon?: ReactNode
  title?: string
  type?: 'divider'
  action?: () => void
  isActive?: () => void
}

export default ({ icon, title, action, isActive }: TipTapMenuItemType) => {
  return (
    <Button className={`${styles.menuItem} ${isActive?.() ? 'is-active' : ''}`} title={title} onClick={action}>
      {icon}
    </Button>
  )
}
