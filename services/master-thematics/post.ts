import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { httpGetDetailResponseSchemaBuilder } from '../../../BaseResponse'
import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/thematic`

export const ThematicCreateItemBodySchema = zfd.formData({
  image: zfd.file(),
  name: zfd.text(),
  desc: zfd.text(),
})

export type ThematicCreateItemBody = z.infer<typeof ThematicCreateItemBodySchema>

export const ThematicCreateItemResultSchema = z.object({
  thematic_id: z.string(),
  desc: z.string(),
  image: z.string(),
  name: z.string(),
  status: z.union([z.literal(0), z.literal(1)]),
})

export type ThematicCreateItemResult = z.infer<typeof ThematicCreateItemResultSchema>

export const ThematicCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(ThematicCreateItemResultSchema)

export type ThematicCreateItemResponse = z.infer<typeof ThematicCreateItemResponseSchema>

export const createItem = async <ResponseType = ThematicCreateItemResponse>({
  body,
  options,
}: {
  body: ThematicCreateItemBody
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
