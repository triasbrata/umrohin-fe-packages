'use client'

import { Button, ButtonProps, Typography } from 'antd'
import { Plus } from 'iconoir-react'
import Image from 'next/image'

type Props = {
  isSearch?: boolean
  description: string
  buttonProps: ButtonProps & { text?: string }
  withButton?: boolean
}

export const EmptyState = (props: Props) => {
  const { description, buttonProps, isSearch, withButton = true } = props
  const { text = 'Action', ...restButtonProps } = buttonProps

  return (
    <div className="flex flex-col items-center justify-center pb-8">
      <Image src={require('@apps/assets/icons/no-content-backup.svg')} alt="No Data" className="h-[300px] w-[300px]" />
      <Typography.Paragraph className="text-center font-semibold m-0 mt-3">
        {isSearch ? 'Tidak ada data yang ditemukan' : 'Belum ada data yang tersedia'}
      </Typography.Paragraph>
      <Typography.Paragraph className="text-center m-0 mt-1">
        {isSearch ? 'Silahkan memasukkan keyword pencarian lainnya' : description}
      </Typography.Paragraph>
      {!isSearch && withButton ? (
        <Button
          type="primary"
          className="flex items-center rounded-full text-sm font-semibold h-10 mt-8"
          style={{
            backgroundColor: '#EE204D',
            color: '#FFFFFF',
          }}
          {...restButtonProps}
        >
          <Plus />
          {text}
        </Button>
      ) : null}
    </div>
  )
}
