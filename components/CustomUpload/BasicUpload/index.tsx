'use client'

import { Flex, Typography, Upload } from 'antd'
import { DraggerProps, UploadFile } from 'antd/es/upload'
import { AddFolder } from 'iconoir-react'
import { useEffect, useState } from 'react'

import styles from './BasicUpload.module.css'

export const BasicUpload = (props: DraggerProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    if (!props.fileList?.length) return
    setFileList(props.fileList)
  }, [props.fileList])

  return (
    <Upload.Dragger
      listType="text"
      maxCount={1}
      showUploadList={{ showPreviewIcon: false }}
      beforeUpload={() => false}
      className={styles.basicUpload}
      {...props}
      onChange={(value) => {
        props.onChange?.(value)
        setFileList(value.fileList)
      }}
    >
      {fileList.length < 1 && (
        <Flex
          align="center"
          justify="center"
          vertical
          className="border border-[#D9D9D9] rounded-lg bg-[#F6F8FA] w-full p-[10px]"
        >
          <AddFolder height={48} width={48} strokeWidth={1} />
          <Typography.Paragraph className="text-base text-center m-0 mt-5">
            Klik atau seret file ke area ini untuk mengunggah
          </Typography.Paragraph>
        </Flex>
      )}
    </Upload.Dragger>
  )
}
