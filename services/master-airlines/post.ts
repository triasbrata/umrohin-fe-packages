import { common } from '@apps/packages/lib/constants'
import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/airlines`

export const AirlinesCreateItemBodySchema = zfd.formData({
  icon: zfd.file(),
  is_highlight: z.boolean(),
  name: zfd.text(),
  code: zfd.text(),
  desc: zfd.text().optional(),
})

export type AirlinesCreateItemBody = z.infer<typeof AirlinesCreateItemBodySchema>

export const AirlinesCreateItemResultSchema = z.object({
  airlines_id: z.string(),
  name: z.string(),
  code: z.string(),
  desc: z.string().optional(),
  is_highlight: z.boolean(),
  icon: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.boolean()]),
})

export type AirlinesCreateItemResult = z.infer<typeof AirlinesCreateItemResultSchema>

export const AirlinesCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(AirlinesCreateItemResultSchema)

export type AirlinesCreateItemResponse = z.infer<typeof AirlinesCreateItemResponseSchema>

export const createItem = async <ResponseType = AirlinesCreateItemResponse>({
  body,
  options,
}: {
  body: AirlinesCreateItemBody
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
