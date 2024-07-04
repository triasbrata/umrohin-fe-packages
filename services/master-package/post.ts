import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const PackageCreateItemBodySchema = zfd.formData({
  user_id: zfd.text(),
  name: zfd.text(),
  package_name: zfd.text(),
  title: zfd.text(),
  description: zfd.text(),
  status: zfd.text(),
})
export type PackageCreateItemBody = z.infer<typeof PackageCreateItemBodySchema>

export const PackageCreateItemResultSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  name: z.string(),
  package_name: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
})
export type PackageCreateItemResult = z.infer<typeof PackageCreateItemResultSchema>

export const PackageCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(PackageCreateItemResultSchema)
export type PackageCreateItemResponse = z.infer<typeof PackageCreateItemResponseSchema>

export const createItem = async <ResponseType = PackageCreateItemResponse>({
  body,
  options,
}: {
  body: PackageCreateItemBody
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
    url: '/v1/products',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
