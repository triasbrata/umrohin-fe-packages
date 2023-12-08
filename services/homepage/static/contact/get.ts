import { common } from '@apps/packages/lib/constants'
import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../../../apiService'

const endpointUrl = `${common.ROOT_ENDPOINT}/homepage/static/contact-number`

export const HomepageStaticContactSchema = z.object({
  phone_number: z.string(),
})

export type HomepageStaticContact = z.infer<typeof HomepageStaticContactSchema>

export const HomepageStaticContactResponseSchema = httpGetDetailResponseSchemaBuilder(HomepageStaticContactSchema)

export type HomepageStaticContactResponse = z.infer<typeof HomepageStaticContactResponseSchema>

type HomepageStaticContactOpt = {
  options?: AxiosRequestConfig
}

export const getContact = async <ResponseType = HomepageStaticContactResponse>(args?: HomepageStaticContactOpt) => {
  const { options } = args ?? {}
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: endpointUrl,
  })
  return response?.data
}
