'use client'

import { Typography } from 'antd'
import Image from 'next/image'

type Props = {
  isSearch?: boolean
  description: string
}

export const EmptyState = (props: Props) => {
  const { description, isSearch } = props

  return (
    <div className="flex flex-col items-center justify-center pb-8">
      <Image src={require('@apps/assets/icons/no-content-backup.svg')} alt="No Data" className="h-[300px] w-[300px]" />
      <Typography.Paragraph className="text-center font-semibold m-0 mt-3">
        {isSearch ? 'Tidak ada data yang ditemukan' : 'Belum ada data yang tersedia'}
      </Typography.Paragraph>
      <Typography.Paragraph className="text-center m-0 mt-1">
        {isSearch ? 'Silahkan memasukkan keyword pencarian lainnya' : description}
      </Typography.Paragraph>
    </div>
  )
}
