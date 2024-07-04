import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const PackageUpdateItemParamsSchema = z.object({ id: z.string().optional() })
export type PackageUpdateItemParams = z.infer<typeof PackageUpdateItemParamsSchema>

export const PackageUpdateItemBodySchema = zfd.formData({
  user_id: zfd.text(),
  name: zfd.text(),
  package_name: zfd.text(),
  title: zfd.text(),
  description: zfd.text(),
  status: zfd.text(),
})
export type PackageUpdateItemBody = z.infer<typeof PackageUpdateItemBodySchema>

export const PackageUpdateItemResultSchema = z.object({
  id: z.string(),
  user_id: z.string(),
  name: z.string(),
  package_name: z.string(),
  title: z.string(),
  description: z.string(),
  status: z.string(),
})
export type PackageUpdateItemResult = z.infer<typeof PackageUpdateItemResultSchema>

export const PackageUpdateItemResponseSchema = httpGetDetailResponseSchemaBuilder(PackageUpdateItemResultSchema)
export type PackageUpdateItemResponse = z.infer<typeof PackageUpdateItemResponseSchema>

export const updateItem = async <ResponseType = PackageUpdateItemResponse>({
  params,
  body,
  options,
}: {
  params: PackageUpdateItemParams
  body: PackageUpdateItemBody
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => {
    if (typeof value === 'object') formData.append(key, value)
    else formData.append(key, value.toString())
  })

  const response: AxiosResponse<ResponseType> = await apiCall({
    data: formData,
    ...options,
    method: 'put',
    url: `/v1/products/${id}`,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
