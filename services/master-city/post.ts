import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/city`

export const CityCreateItemBodySchema = zfd.formData({
  image: zfd.file(),
  city_name: zfd.text(),
  province: zfd.text(),
  country_name: zfd.text(),
  country_code: zfd.text(),
})

export type CityCreateItemBody = z.infer<typeof CityCreateItemBodySchema>

export const CityCreateItemResultSchema = z.object({
  city_id: z.number(),
  city_name: z.string(),
  country_name: z.string(),
  country_code: z.string(),
  province: z.string(),
  image: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type CityCreateItemResult = z.infer<typeof CityCreateItemResultSchema>

export const CityCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(CityCreateItemResultSchema)

export type CityCreateItemResponse = z.infer<typeof CityCreateItemResponseSchema>

export const createItem = async <ResponseType = CityCreateItemResponse>({
  body,
  options,
}: {
  body: CityCreateItemBody
  options?: AxiosRequestConfig
}) => {
  const formData = new FormData()
  Object.entries(body).forEach(([key, value]) => formData.append(key, value))

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
