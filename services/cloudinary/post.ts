import { common } from '@apps/packages/lib/constants'
import { RcFile } from 'antd/es/upload'
import axios from 'axios'

const cloudinaryBaseUrl = common.NEXT_PUBLIC_CLOUDINARY_BASE_URL
const cloudinaryCloudName = common.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const cloudinaryPresetName = common.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME

export type UploadImageParams = {
  file: RcFile
}

export type UploadImageResponse = {
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  tags: any[]
  bytes: number
  type: string
  etag: string
  placeholder: false
  url: string
  secure_url: string
  folder: string
  original_filename: string
  original_extension: string
}

export const uploadImage = async (params: UploadImageParams) => {
  const formData = new FormData()
  formData.append('file', params.file)
  formData.append('upload_preset', cloudinaryPresetName)

  const response = await axios.post<UploadImageResponse>(
    `${cloudinaryBaseUrl}/${cloudinaryCloudName}/image/upload`,
    formData
  )

  return response.data
}
