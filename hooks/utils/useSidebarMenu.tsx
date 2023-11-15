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
  ViewGrid,
  SeaAndSun,
  Medal,
  Group,
} from 'iconoir-react'
import Link from 'next/link'
import { LiaKaabaSolid } from 'react-icons/lia'

type sidebarMenuItem = {
  key: React.Key
  label: React.ReactNode
  icon?: React.ReactNode
}

type getItemType = {
  key: React.Key
  label: React.ReactNode
  icon?: React.ReactNode
  type?: MenuItemGroupType['type'] | MenuDividerType['type']
  children?: sidebarMenuItem[]
}

export const useSidebarMenu = () => {
  const sidebarMenuList: getItemType[] = [
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
          key: '/customers/list',
          icon: <UserCrown height={24} width={24} />,
          label: <Link href="/customers/list">Customer</Link>,
        },
        {
          key: '/customers/transactions',
          icon: <ShoppingBagCheck height={24} width={24} />,
          label: <Link href="/customers/transactions">Transaksi</Link>,
        },
      ],
    },
    {
      key: '/mitra',
      label: 'Data Mitra Travel',
      type: 'group',
      children: [
        {
          key: '/mitra/travel',
          icon: <VerifiedUser height={24} width={24} />,
          label: <Link href="/mitra/travel">Mitra Travel</Link>,
        },
        {
          key: '/mitra/packages',
          icon: <LiaKaabaSolid size={24} />,
          label: <Link href="/mitra/packages">Paket Umroh</Link>,
        },
        {
          key: '/mitra/airlines',
          icon: <Cart height={24} width={24} />,
          label: <Link href="/mitra/airlines">Transaksi Paket Maskapai</Link>,
        },
        {
          key: '/mitra/hotels',
          icon: <Cart height={24} width={24} />,
          label: <Link href="/mitra/hotels">Transaksi Paket Hotel</Link>,
        },
        {
          key: '/mitra/land-arrangement',
          icon: <Cart height={24} width={24} />,
          label: <Link href="/mitra/land-arrangement">Transaksi Paket LA</Link>,
        },
        {
          key: '/mitra/railway',
          icon: <Cart height={24} width={24} />,
          label: <Link href="/mitra/railway">Transaksi Paket Kereta Cepat</Link>,
        },
      ],
    },
    {
      key: '/providers',
      label: 'Data Provider',
      type: 'group',
      children: [
        {
          key: '/providers/list',
          icon: <UserCart height={24} width={24} />,
          label: <Link href="/providers/list">Provider</Link>,
        },
        {
          key: '/providers/visa',
          icon: <UserScan height={24} width={24} />,
          label: <Link href="/providers/visa">Visa</Link>,
        },
        {
          key: '/providers/airlines',
          icon: <Airplane height={24} width={24} />,
          label: <Link href="/providers/airlines">Paket Maskapai</Link>,
        },
        {
          key: '/providers/hotels',
          icon: <City height={24} width={24} />,
          label: <Link href="/providers/hotels">Paket Hotel</Link>,
        },
        {
          key: '/providers/land-arrangement',
          icon: <HomeUser height={24} width={24} />,
          label: <Link href="/providers/land-arrangement">Paket LA</Link>,
        },
      ],
    },
    {
      key: '/master',
      label: 'Data Master',
      type: 'group',
      children: [
        {
          key: '/master/tour-leader',
          icon: <UserStar height={24} width={24} />,
          label: <Link href="/master/tour-leader">Pembimbing</Link>,
        },
        {
          key: '/master/cities',
          icon: <City height={24} width={24} />,
          label: <Link href="/master/cities">Kota</Link>,
        },
        {
          key: '/master/hotels',
          icon: <Building height={24} width={24} />,
          label: <Link href="/master/hotels">Hotel</Link>,
        },
        {
          key: '/master/airports',
          icon: <AirplaneHelix45Deg height={24} width={24} />,
          label: <Link href="/master/airports">Bandara</Link>,
        },
        {
          key: '/master/airlines',
          icon: <Airplane height={24} width={24} />,
          label: <Link href="/master/airlines">Maskapai Penerbangan</Link>,
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

  return { sidebarMenuList }
}
