'use client'

import { useSidebarMenu } from '@apps/split/hooks/utils'
import { Layout, Menu, MenuProps } from 'antd'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export const SideNav = () => {
  const pathname = usePathname()
  const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname])

  const { sidebarMenuList } = useSidebarMenu()

  const handleChangeMenu: MenuProps['onClick'] = (e) => {
    setSelectedKeys([e.key])
  }

  return (
    <Layout.Sider
      collapsible
      trigger={null}
      className="relative border-r border-r-[#E6EBF2] bg-[#FCFDFD] h-screen min-w-[288px] max-w-[288px] overflow-auto"
    >
      <Link href="/">
        <div className="flex items-center justify-center gap-4 border-b border-b-[#E5E7EB] overflow-hidden h-[108px] p-4">
          <Image src={require('@apps/public/umrohin-logo.png')} alt="Umroh.in" priority />
        </div>
      </Link>
      <Menu
        mode="inline"
        theme="light"
        defaultSelectedKeys={selectedKeys}
        items={sidebarMenuList}
        className="side-nav-menu border-r-0 bg-[#FCFDFD]"
        onClick={handleChangeMenu}
      />
    </Layout.Sider>
  )
}
