import { common } from '@apps/packages/lib/constants'
import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/tour-leader`

export const TourLeaderCreateItemBodySchema = zfd.formData({
  image: zfd.file(),
  thumbnail: zfd.file(),
  is_highlight: z.boolean(),
  name: zfd.text(),
  desc: zfd.text().optional(),
})

export type TourLeaderCreateItemBody = z.infer<typeof TourLeaderCreateItemBodySchema>

export const TourLeaderCreateItemResultSchema = z.object({
  tour_leader_id: z.string(),
  name: z.string(),
  desc: z.string().optional(),
  is_highlight: z.boolean(),
  thumbnail: z.string(),
  image: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type TourLeaderCreateItemResult = z.infer<typeof TourLeaderCreateItemResultSchema>

export const TourLeaderCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(TourLeaderCreateItemResultSchema)

export type TourLeaderCreateItemResponse = z.infer<typeof TourLeaderCreateItemResponseSchema>

export const createItem = async <ResponseType = TourLeaderCreateItemResponse>({
  body,
  options,
}: {
  body: TourLeaderCreateItemBody
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
