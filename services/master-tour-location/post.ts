import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const MasterTourLocationCreateItemBodySchema = zfd.formData({
  name: zfd.text(),
  description: zfd.text(),
  image: z.union([zfd.file(), z.string()]),
  is_active: zfd.text(),
})
export type MasterTourLocationCreateItemBody = z.infer<typeof MasterTourLocationCreateItemBodySchema>

export const MasterTourLocationCreateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  is_active: z.string(),
})
export type MasterTourLocationCreateItemResult = z.infer<typeof MasterTourLocationCreateItemResultSchema>

export const MasterTourLocationCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterTourLocationCreateItemResultSchema
)
export type MasterTourLocationCreateItemResponse = z.infer<typeof MasterTourLocationCreateItemResponseSchema>

export const createItem = async <ResponseType = MasterTourLocationCreateItemResponse>({
  body,
  options,
}: {
  body: MasterTourLocationCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => {
    if (typeof value === 'object') formData.append(key, value)
    else formData.append(key, value.toString())
  })

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'post',
    url: '/v1/object_wisata',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
