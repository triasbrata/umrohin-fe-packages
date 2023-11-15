import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/tour-location`

export const MasterTourLocationCreateItemBodySchema = zfd.formData({
  image: zfd.file(),
  name: zfd.text(),
  main_tour_location: z.boolean(),
  is_highlight: z.boolean(),
  city_id: z.number(),
})

export type MasterTourLocationCreateItemBody = z.infer<typeof MasterTourLocationCreateItemBodySchema>

export const MasterTourLocationCreateItemResultSchema = z.object({
  tour_location_id: z.string(),
  name: z.string(),
  city_id: z.string(),
  status: z.union([z.literal(0), z.literal(1)]),
  image: z.string(),
  main_tour_location: z.boolean(),
  is_highlight: z.boolean(),
  city_name: z.string(),
  province: z.string(),
  country_name: z.string(),
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
    url: endpointUrl,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
