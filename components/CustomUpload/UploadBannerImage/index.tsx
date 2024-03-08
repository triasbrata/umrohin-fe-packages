'use client'

import { Flex, Typography, Upload } from 'antd'
import { DraggerProps, UploadFile } from 'antd/es/upload'
import { AddMediaImage } from 'iconoir-react'
import { useEffect, useState } from 'react'

import styles from './UploadBannerImage.module.css'

export const UploadBannerImage = (props: DraggerProps) => {
  const [fileList, setFileList] = useState<UploadFile[]>([])

  useEffect(() => {
    if (!props.fileList?.length) return
    setFileList(props.fileList)
  }, [props.fileList])

  return (
    <Upload.Dragger
      listType="picture-card"
      maxCount={1}
      showUploadList={{ showPreviewIcon: false }}
      beforeUpload={() => false}
      className={styles.uploadBannerImage}
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
          <AddMediaImage height={48} width={48} strokeWidth={1} />
          <Typography.Paragraph className="text-base text-center m-0 mt-5">
            Klik atau seret file ke area ini untuk mengunggah
          </Typography.Paragraph>
          <Typography.Paragraph className="text-sm text-[#00000073] text-center m-0 mt-1">
            Resolusi Gambar disarankan 1140 x 285. Max File 1 MB. Format PNG, JPEG
          </Typography.Paragraph>
        </Flex>
      )}
    </Upload.Dragger>
  )
}
