'use client'

import { Flex, Typography, Upload } from 'antd'
import { DraggerProps, UploadFile } from 'antd/es/upload'
import { CloudUpload } from 'iconoir-react'
import { useEffect, useState } from 'react'

import styles from './BasicUpload.module.css'

export const BasicUpload = ({ id, ...props }: DraggerProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    if (!props.fileList?.length) return
    setFileList(props.fileList)
  }, [props.fileList])

  return (
    <Upload.Dragger
      listType="picture-card"
      showUploadList={{ showPreviewIcon: false }}
      beforeUpload={() => false}
      className={styles.basicUpload}
      {...props}
      onChange={(value) => {
        props.onChange?.(value)
        setFileList(value.fileList)
      }}
    >
      {(props.multiple || fileList.length < 1) && (
        <Flex
          id={id}
          align="center"
          justify="center"
          vertical
          className="border border-[#D9D9D9] rounded-lg p-10 bg-[#F6F8FA] w-full"
        >
          <CloudUpload height={48} width={48} strokeWidth={1} color="red" />
          <Typography.Paragraph className="text-base text-center m-0 mt-5 text-red-500">
            Klik atau seret file ke area ini untuk upload
          </Typography.Paragraph>
        </Flex>
      )}
    </Upload.Dragger>
  )
}
