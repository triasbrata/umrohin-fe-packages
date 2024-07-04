import { common } from '@apps/packages/lib/constants'
import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../../../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/homepage/static/terms-and-conditions`

export const HomepageStaticTermsAndConditionsSchema = z.object({
  content: z.string().optional(),
})

export type HomepageStaticTermsAndConditions = z.infer<typeof HomepageStaticTermsAndConditionsSchema>

export const HomepageStaticTermsAndConditionsResponseSchema = httpGetDetailResponseSchemaBuilder(
  HomepageStaticTermsAndConditionsSchema
)

export type HomepageStaticTermsAndConditionsResponse = z.infer<typeof HomepageStaticTermsAndConditionsResponseSchema>

type HomepageStaticTermsAndConditionsOpt = {
  options?: AxiosRequestConfig
}

export const getTermsAndConditions = async <ResponseType = HomepageStaticTermsAndConditionsResponse>(
  args?: HomepageStaticTermsAndConditionsOpt
) => {
  const { options } = args ?? {}
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: endpointUrl,
  })
  return response?.data
}
