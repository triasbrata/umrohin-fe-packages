import { MenuDividerType, MenuItemGroupType } from 'antd/es/menu/hooks/useItems'
import {
  UserCrown,
  ShoppingBagCheck,
  HomeSimpleDoor,
  UserStar,
  UserBag,
  ViewGrid,
  SeaAndSun,
  Medal,
  Group,
  VerifiedUser,
  Building,
  Airplane,
  Strategy,
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
}

export const useSidebarMenu = () => {
  const { data: session } = useSession()

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
        children: [
          {
            key: '/customer/list',
            icon: <UserCrown height={24} width={24} />,
            label: <Link href="/customer/list">Customer</Link>,
          },
          {
            key: '/customer/order',
            icon: <ShoppingBagCheck height={24} width={24} />,
            label: <Link href="/customer/order">Transaksi</Link>,
          },
        ],
      },
      {
        key: '/packages',
        label: 'Paket',
        type: 'group',
        children: [
          {
            key: '/package/package',
            icon: <LiaKaabaSolid size={24} />,
            label: <Link href="/package/package">Umroh Tokoh</Link>,
          },
          {
            key: '/package/flight-ticket',
            icon: <Airplane height={24} width={24} />,
            label: <Link href="/package/flight-ticket">Tiket Pesawat</Link>,
          },
          {
            key: '/package/hotel-internal',
            icon: <Building height={24} width={24} />,
            label: <Link href="/package/hotel-internal">Hotel</Link>,
          },
        ],
      },
      {
        key: '/master',
        label: 'Data Master',
        type: 'group',
        children: [
          {
            key: '/master/travel-partner',
            icon: <VerifiedUser height={24} width={24} />,
            label: <Link href="/master/travel-partner">Mitra Travel</Link>,
          },
          {
            key: '/master/tour-leader',
            icon: <UserStar height={24} width={24} />,
            label: <Link href="/master/tour-leader">Pembimbing</Link>,
          },
          {
            key: '/master/provider',
            icon: <UserBag height={24} width={24} />,
            label: <Link href="/master/provider">Provider</Link>,
          },
          {
            key: '/master/thematics',
            icon: <ViewGrid height={24} width={24} style={{ transform: 'rotate(45deg)' }} />,
            label: <Link href="/master/thematics">Tema</Link>,
          },
          {
            key: '/master/tour-location',
            icon: <SeaAndSun height={24} width={24} />,
            label: <Link href="/master/tour-location">Objek Wisata</Link>,
          },
          {
            key: '/master/facilities',
            icon: <Medal height={24} width={24} />,
            label: <Link href="/master/facilities">Fasilitas</Link>,
          },
          {
            key: '/master/flight-route',
            icon: <Strategy height={24} width={24} />,
            label: <Link href="/master/flight-route">Rute Penerbangan</Link>,
          },
        ],
      },
      {
        key: '/umrohin',
        label: 'Umrohin',
        type: 'group',
        children: [
          {
            key: '/umrohin/internal-user',
            icon: <Group height={24} width={24} />,
            label: <Link href="/umrohin/internal-user">Internal User</Link>,
          },
        ],
      },
    ]

    return menus
  }, [session])

  return { sidebarMenuList }
}
