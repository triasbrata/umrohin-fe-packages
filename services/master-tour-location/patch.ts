import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const MasterTourLocationUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type MasterTourLocationUpdateItemParams = z.infer<typeof MasterTourLocationUpdateItemParamsSchema>

export const MasterTourLocationUpdateItemBodySchema = zfd.formData({
  name: zfd.text(),
  description: zfd.text(),
  image: z.union([zfd.file(), z.string()]),
  is_active: zfd.text(),
})
export type MasterTourLocationUpdateItemBody = z.infer<typeof MasterTourLocationUpdateItemBodySchema>

export const MasterTourLocationUpdateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  is_active: z.string(),
})
export type MasterTourLocationUpdateItemResult = z.infer<typeof MasterTourLocationUpdateItemResultSchema>

export const MasterTourLocationUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterTourLocationUpdateItemResultSchema
)
export type MasterTourLocationUpdateItemResponse = z.infer<typeof MasterTourLocationUpdateItemResponseSchema>

export const updateItem = async <ResponseType = MasterTourLocationUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: MasterTourLocationUpdateItemParams
  body: MasterTourLocationUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => {
    formData.append(key, value)
  })

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'put',
    url: `v1/object_wisata/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
