import { common } from '@apps/packages/lib/constants'
import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../../../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/homepage/static/privacy-policy`

export const HomepageStaticPrivacyPolicySchema = z.object({
  content: z.string().optional(),
})

export type HomepageStaticPrivacyPolicy = z.infer<typeof HomepageStaticPrivacyPolicySchema>

export const HomepageStaticPrivacyPolicyResponseSchema = httpGetDetailResponseSchemaBuilder(
  HomepageStaticPrivacyPolicySchema
)

export type HomepageStaticPrivacyPolicyResponse = z.infer<typeof HomepageStaticPrivacyPolicyResponseSchema>

type HomepageStaticPrivacyPolicyOpt = {
  options?: AxiosRequestConfig
}

export const getPrivacyPolicy = async <ResponseType = HomepageStaticPrivacyPolicyResponse>(
  args?: HomepageStaticPrivacyPolicyOpt
) => {
  const { options } = args ?? {}
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: endpointUrl,
  })
  return response?.data
}
