import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const MasterFacilityCreateItemBodySchema = zfd.formData({
  name: zfd.text(),
  icon: zfd.file(),
})
export type MasterFacilityCreateItemBody = z.infer<typeof MasterFacilityCreateItemBodySchema>

export const MasterFacilityCreateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
})
export type MasterFacilityCreateItemResult = z.infer<typeof MasterFacilityCreateItemResultSchema>

export const MasterFacilityCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  MasterFacilityCreateItemResultSchema.nullable()
)
export type MasterFacilityCreateItemResponse = z.infer<typeof MasterFacilityCreateItemResponseSchema>

export const createItem = async <ResponseType = MasterFacilityCreateItemResponse>({
  body,
  options,
}: {
  body: MasterFacilityCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => formData.append(key, value))

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'post',
    url: '/v1/facilities',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
