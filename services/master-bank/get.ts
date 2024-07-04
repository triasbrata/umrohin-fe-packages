import { common } from '@apps/packages/lib/constants'
import { httpGetListResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/bank`

export const MasterBankListParamsSchema = z.object({
  page: z.number().optional(),
  page_size: z.number().optional(),
  name: z.string().optional(),
  ob: z.string().optional(),
  or: z.string().optional(),
})

export type MasterBankListParams = z.infer<typeof MasterBankListParamsSchema>

export const MasterBankListItemSchema = z.object({
  bank_id: z.string(),
  name: z.string(),
  code: z.string(),
})

export type MasterBankListItem = z.infer<typeof MasterBankListItemSchema>

export const MasterBankListResponseSchema = httpGetListResponseSchemaBuilder(MasterBankListItemSchema)

export type MasterBankListResponse = z.infer<typeof MasterBankListResponseSchema>

export const getList = async <ResponseType = MasterBankListResponse>({
  params,
  options,
}: {
  params: MasterBankListParams
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    params,
    ...options,
    method: 'get',
    url: endpointUrl,
  })
  return response?.data
}
