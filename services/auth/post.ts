import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

// Login
export const AdminAuthLoginBodySchema = z.object({
  email: z.string(),
  password: z.string(),
})
export type AdminAuthLoginBody = z.infer<typeof AdminAuthLoginBodySchema>

export const AdminAuthLoginResultSchema = z.object({
  user_id: z.string(),
  name: z.string(),
  email: z.string(),
  token: z.string(),
  refreshToken: z.string(),
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
    url: `/v1/auth/login`,
  })
  return response?.data
}

// Refresh
export const AdminAuthRefreshBodySchema = z.object({
  refresh_token: z.string(),
})
export type AdminAuthRefreshBody = z.infer<typeof AdminAuthRefreshBodySchema>

export const AdminAuthRefreshResultSchema = z.object({
  access_token: z.string(),
  refreshToken: z.string(),
})
export type AdminAuthRefreshResult = z.infer<typeof AdminAuthRefreshResultSchema>

export const AdminAuthRefreshResponseSchema = httpGetDetailResponseSchemaBuilder(AdminAuthRefreshResultSchema)
export type AdminAuthRefreshResponse = z.infer<typeof AdminAuthRefreshResponseSchema>

export const adminRefresh = async <ResponseType = AdminAuthRefreshResponse>({
  body,
  options,
}: {
  body: AdminAuthRefreshBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: `/v1/auth/refresh_token`,
  })
  return response?.data
}
