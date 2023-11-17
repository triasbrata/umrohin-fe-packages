import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

const endpointUrl = '/auth/admin'

export const AdminAuthLoginBodySchema = z.object({
  email: z.string(),
  password: z.string(),
})

export type AdminAuthLoginBody = z.infer<typeof AdminAuthLoginBodySchema>

export const AdminAuthLoginResultSchema = z.object({
  userID: z.string(),
  userName: z.string(),
  jwtToken: z.string(),
  refreshToken: z.string(),
  userPermission: z.record(
    z.string(),
    z.object({
      active: z.boolean(),
      name: z.string(),
    })
  ),
})

export type AdminAuthLoginResult = z.infer<typeof AdminAuthLoginResultSchema>

export const AdminAuthLoginResponseSchema = httpGetDetailResponseSchemaBuilder(AdminAuthLoginResultSchema)

export type AdminAuthLoginResponse = z.infer<typeof AdminAuthLoginResponseSchema>

export const adminLogin = async <ResponseType = AdminAuthLoginResponse>({
  body,
  options,
}: {
  body: AdminAuthLoginBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: endpointUrl,
  })
  return response?.data
}

export const AdminAuthValidateBodySchema = z.object({
  token: z.string(),
  pin: z.string(),
})

export type AdminAuthValidateBody = z.infer<typeof AdminAuthValidateBodySchema>

export const AdminAuthValidateResultSchema = z.object({
  jwtToken: z.string(),
  refreshToken: z.string(),
  userPermission: z.record(
    z.string(),
    z.object({
      active: z.boolean(),
      name: z.string(),
    })
  ),
})

export type AdminAuthValidateResult = z.infer<typeof AdminAuthValidateResultSchema>

export const AdminAuthValidateResponseSchema = httpGetDetailResponseSchemaBuilder(AdminAuthValidateResultSchema)

export type AdminAuthValidateResponse = z.infer<typeof AdminAuthValidateResponseSchema>

export const adminValidate = async <ResponseType = AdminAuthValidateResponse>({
  body,
  options,
}: {
  body: AdminAuthValidateBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: `${endpointUrl}/validate`,
  })
  return response?.data
}

export const AdminAuthRefreshHeadersSchema = z.object({
  'x-jwt-refresh': z.string(),
})

export type AdminAuthRefreshHeaders = z.infer<typeof AdminAuthRefreshHeadersSchema>

export const AdminAuthRefreshResultSchema = AdminAuthValidateResultSchema.omit({ refreshToken: true })

export type AdminAuthRefreshResult = z.infer<typeof AdminAuthRefreshResultSchema>

export const AdminAuthRefreshResponseSchema = httpGetDetailResponseSchemaBuilder(AdminAuthRefreshResultSchema)

export type AdminAuthRefreshResponse = z.infer<typeof AdminAuthRefreshResponseSchema>

export const adminRefresh = async <ResponseType = AdminAuthRefreshResponse>({
  headers,
  options,
}: {
  headers: AdminAuthRefreshHeaders & AxiosRequestConfig['headers']
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    headers,
    ...options,
    method: 'post',
    url: `${endpointUrl}/refresh`,
  })
  return response?.data
}
