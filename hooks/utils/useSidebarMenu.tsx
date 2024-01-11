import { MenuDividerType, MenuItemGroupType } from 'antd/es/menu/hooks/useItems'
import {
  UserCrown,
  ShoppingBagCheck,
  HomeSimpleDoor,
  VerifiedUser,
  City,
  Cart,
  UserCart,
  UserScan,
  Airplane,
  HomeUser,
  UserStar,
  Building,
  AirplaneHelix45Deg,
  Community,
  ViewGrid,
  SeaAndSun,
  Medal,
  Group,
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
            key: '/customers/list',
            icon: <UserCrown height={24} width={24} />,
            label: <Link href="/customers/list">Customer</Link>,
            permissions: ['get.customer'],
          },
          {
            key: '/customers/transactions',
            icon: <ShoppingBagCheck height={24} width={24} />,
            label: <Link href="/customers/transactions">Transaksi</Link>,
            permissions: ['get.transaction'],
          },
        ],
      },
      {
        key: '/mitra',
        label: 'Data Mitra Travel',
        type: 'group',
        permissions: [
          'get.agency',
          'get.packages',
          'get.agency-hotel',
          'get.agency-land-arrangement',
          'get.agency-railway',
        ],
        children: [
          {
            key: '/mitra/travel',
            icon: <VerifiedUser height={24} width={24} />,
            label: <Link href="/mitra/travel">Mitra Travel</Link>,
            permissions: ['get.agency'],
          },
          {
            key: '/mitra/packages',
            icon: <LiaKaabaSolid size={24} />,
            label: <Link href="/mitra/packages">Paket Umroh</Link>,
            permissions: ['get.packages'],
          },
          {
            key: '/mitra/group',
            icon: <Community height={24} width={24} />,
            label: <Link href="/mitra/group">Grup Keberangkatan</Link>,
            permissions: ['get.agency'],
          },
          {
            key: '/mitra/airlines',
            icon: <Cart height={24} width={24} />,
            label: <Link href="/mitra/airlines">Transaksi Paket Maskapai</Link>,
            permissions: ['get.agency-airlines'],
          },
          {
            key: '/mitra/hotels',
            icon: <Cart height={24} width={24} />,
            label: <Link href="/mitra/hotels">Transaksi Paket Hotel</Link>,
            permissions: ['get.agency-hotel'],
          },
          {
            key: '/mitra/land-arrangement',
            icon: <Cart height={24} width={24} />,
            label: <Link href="/mitra/land-arrangement">Transaksi Paket LA</Link>,
            permissions: ['get.agency-land-arrangement'],
          },
          {
            key: '/mitra/railway',
            icon: <Cart height={24} width={24} />,
            label: <Link href="/mitra/railway">Transaksi Paket Kereta Cepat</Link>,
            permissions: ['get.agency-railway'],
          },
        ],
      },
      {
        key: '/providers',
        label: 'Data Provider',
        type: 'group',
        permissions: ['get.provider'],
        children: [
          {
            key: '/providers/list',
            icon: <UserCart height={24} width={24} />,
            label: <Link href="/providers/list">Provider</Link>,
            permissions: ['get.provider'],
          },
          {
            key: '/providers/visa',
            icon: <UserScan height={24} width={24} />,
            label: <Link href="/providers/visa">Visa</Link>,
            permissions: ['get.provider-visa'],
          },
          {
            key: '/providers/airlines',
            icon: <Airplane height={24} width={24} />,
            label: <Link href="/providers/airlines">Paket Maskapai</Link>,
            permissions: ['get.provider-airlines'],
          },
          {
            key: '/providers/hotels',
            icon: <City height={24} width={24} />,
            label: <Link href="/providers/hotels">Paket Hotel</Link>,
            permissions: ['get.provider-hotel'],
          },
          {
            key: '/providers/land-arrangement',
            icon: <HomeUser height={24} width={24} />,
            label: <Link href="/providers/land-arrangement">Paket LA</Link>,
            permissions: ['get.provider-land-arrangement'],
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
            key: '/master/tour-leader',
            icon: <UserStar height={24} width={24} />,
            label: <Link href="/master/tour-leader">Pembimbing</Link>,
            permissions: ['get.tour-leader'],
          },
          {
            key: '/master/cities',
            icon: <City height={24} width={24} />,
            label: <Link href="/master/cities">Kota</Link>,
            permissions: ['get.city'],
          },
          {
            key: '/master/hotels',
            icon: <Building height={24} width={24} />,
            label: <Link href="/master/hotels">Hotel</Link>,
            permissions: ['get.hotels'],
          },
          {
            key: '/master/airports',
            icon: <AirplaneHelix45Deg height={24} width={24} />,
            label: <Link href="/master/airports">Bandara</Link>,
            permissions: ['get.airport'],
          },
          {
            key: '/master/airlines',
            icon: <Airplane height={24} width={24} />,
            label: <Link href="/master/airlines">Maskapai Penerbangan</Link>,
            permissions: ['get.airlines'],
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
