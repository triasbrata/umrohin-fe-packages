'use client'

import { Upload } from 'antd'
import { DraggerProps, UploadFile } from 'antd/es/upload'
import { AddMediaImage } from 'iconoir-react'
import { useEffect, useState } from 'react'

import styles from './BasicUploadImage.module.css'

export const BasicUploadImage = (props: DraggerProps) => {
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
      className={styles.basicUploadImage}
      {...props}
      onChange={(value) => {
        props.onChange?.(value)
        setFileList(value.fileList)
      }}
    >
      {fileList.length < 1 && (
        <div className="flex items-center justify-center border border-[#9CA3AF] border-dashed rounded-md bg-[#F6F8FA] h-24 w-24">
          <AddMediaImage height={24} width={24} />
        </div>
      )}
    </Upload.Dragger>
  )
}
