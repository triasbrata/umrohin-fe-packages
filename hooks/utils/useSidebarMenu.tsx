import { MenuDividerType, MenuItemGroupType } from 'antd/es/menu/hooks/useItems'
import {
  UserCrown,
  ShoppingBagCheck,
  HomeSimpleDoor,
  UserStar,
  ViewGrid,
  SeaAndSun,
  Medal,
  Group,
  VerifiedUser,
} from 'iconoir-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useMemo } from 'react'
import { LiaKaabaSolid } from 'react-icons/lia'

type getItemType = {
  key: React.Key
  label: React.ReactNode
  icon?: React.ReactNode
  type?: MenuItemGroupType['type'] | MenuDividerType['type']
  children?: getItemType[]
  permissions?: string[]
}

export const useSidebarMenu = () => {
  const { data: session } = useSession()
  const permissions = Object.entries(session?.user.userPermission ?? {})
    .filter(([key, value]) => value.active)
    .map(([key]) => key)

  const sidebarMenuList = useMemo(() => {
    const menus: getItemType[] = [
      {
        key: '/',
        icon: <HomeSimpleDoor height={24} width={24} />,
        label: <Link href="/">Dashboard</Link>,
      },
      {
        key: '/customers',
        label: 'Data Customer',
        type: 'group',
        permissions: ['get.customer', 'get.transaction'],
        children: [
          {
            key: '/customer/list',
            icon: <UserCrown height={24} width={24} />,
            label: <Link href="/customer/list">Customer</Link>,
            permissions: ['get.customer'],
          },
          {
            key: '/customer/order',
            icon: <ShoppingBagCheck height={24} width={24} />,
            label: <Link href="/customer/order">Transaksi</Link>,
            permissions: ['get.order'],
          },
        ],
      },
      {
        key: '/master',
        label: 'Data Master',
        type: 'group',
        permissions: ['get.agency'],
        children: [
          {
            key: '/master/package',
            icon: <LiaKaabaSolid size={24} />,
            label: <Link href="/master/package">Paket</Link>,
            permissions: ['get.package'],
          },
          {
            key: '/master/travel-partner',
            icon: <VerifiedUser height={24} width={24} />,
            label: <Link href="/master/travel-partner">Mitra Travel</Link>,
            permissions: ['get.travel-partner'],
          },
          {
            key: '/master/tour-leader',
            icon: <UserStar height={24} width={24} />,
            label: <Link href="/master/tour-leader">Pembimbing</Link>,
            permissions: ['get.tour-leader'],
          },
          {
            key: '/master/figure',
            icon: <UserStar height={24} width={24} />,
            label: <Link href="/master/figure">Tokoh</Link>,
            permissions: ['get.figure'],
          },
          {
            key: '/master/thematics',
            icon: <ViewGrid height={24} width={24} style={{ transform: 'rotate(45deg)' }} />,
            label: <Link href="/master/thematics">Tema</Link>,
            permissions: ['get.thematic'],
          },
          {
            key: '/master/tour-location',
            icon: <SeaAndSun height={24} width={24} />,
            label: <Link href="/master/tour-location">Objek Wisata</Link>,
            permissions: ['get.tour-location'],
          },
          {
            key: '/master/facilities',
            icon: <Medal height={24} width={24} />,
            label: <Link href="/master/facilities">Fasilitas</Link>,
            permissions: ['get.facility'],
          },
        ],
      },
      {
        key: '/umrohin',
        label: 'Umrohin',
        type: 'group',
        permissions: ['get.user'],
        children: [
          {
            key: '/umrohin/internal-user',
            icon: <Group height={24} width={24} />,
            label: <Link href="/umrohin/internal-user">Internal User</Link>,
            permissions: ['get.user'],
          },
        ],
      },
    ]

    const filteredMenu =
      permissions.length > 1
        ? menus
            .map((item) => {
              if (item.permissions && !item.permissions.some((permission) => permissions.includes(permission))) {
                return null // Exclude items with no matching permissions
              }

              if (item.children) {
                const filteredChildren = item.children.filter((child) => {
                  return !child.permissions || child.permissions.some((permission) => permissions.includes(permission))
                })

                if (filteredChildren.length === 0) {
                  return null // Exclude parent item if all children are filtered out
                }

                return { ...item, children: filteredChildren }
              }

              return item
            })
            .filter(Boolean)
        : menus
    return filteredMenu
  }, [session])

  return { sidebarMenuList }
}
