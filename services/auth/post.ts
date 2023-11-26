import { HttpBaseResponseMetaSchema, httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

const endpointUrl = '/auth'

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
    url: `${endpointUrl}/admin`,
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
    url: `${endpointUrl}/admin/validate`,
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
    url: `${endpointUrl}/admin/refresh`,
  })
  return response?.data
}

export const AuthCheckPhoneNumberBodySchema = z.object({
  phone_number: z.string(),
})

export type AuthCheckPhoneNumberBody = z.infer<typeof AuthCheckPhoneNumberBodySchema>

export const AuthCheckPhoneNumberResultSchema = z.object({
  available_status: z.boolean(),
})

export type AuthCheckPhoneNumberResult = z.infer<typeof AuthCheckPhoneNumberResultSchema>

export const AuthCheckPhoneNumberResponseSchema = httpGetDetailResponseSchemaBuilder(AuthCheckPhoneNumberResultSchema)

export type AuthCheckPhoneNumberResponse = z.infer<typeof AuthCheckPhoneNumberResponseSchema>

export const authCheckPhoneNumber = async <ResponseType = AuthCheckPhoneNumberResponse>({
  body,
  options,
}: {
  body: AuthCheckPhoneNumberBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: `${endpointUrl}/check-phone-number`,
  })
  return response?.data
}

export const AuthSignUpBodySchema = z.object({
  phone_number: z.string(),
  name: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
})

export type AuthSignUpBody = z.infer<typeof AuthSignUpBodySchema>

export const AuthSignUpResultSchema = z.object({
  token: z.string(),
  message: z.string(),
})

export type AuthSignUpResult = z.infer<typeof AuthSignUpResultSchema>

export const AuthSignUpResponseSchema = httpGetDetailResponseSchemaBuilder(AuthSignUpResultSchema)

export type AuthSignUpResponse = z.infer<typeof AuthSignUpResponseSchema>

export const authSignUp = async <ResponseType = AuthSignUpResponse>({
  body,
  options,
}: {
  body: AuthSignUpBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: `${endpointUrl}/signup`,
  })
  return response?.data
}

export const AuthValidateBodySchema = z.object({
  phone_number: z.string(),
  name: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
})

export type AuthValidateBody = z.infer<typeof AuthValidateBodySchema>

export const AuthValidateResponseSchema = HttpBaseResponseMetaSchema

export type AuthValidateResponse = z.infer<typeof AuthValidateResponseSchema>

export const authValidate = async <ResponseType = AuthValidateResponse>({
  body,
  options,
}: {
  body: AuthValidateBody
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

export const AuthChangePasswordBodySchema = z.object({
  token: z.string(),
  old_password: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
})

export type AuthChangePasswordBody = z.infer<typeof AuthChangePasswordBodySchema>

export const AuthChangePasswordResponseSchema = HttpBaseResponseMetaSchema

export type AuthChangePasswordResponse = z.infer<typeof AuthChangePasswordResponseSchema>

export const authChangePassword = async <ResponseType = AuthChangePasswordResponse>({
  body,
  options,
}: {
  body: AuthChangePasswordBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: `${endpointUrl}/change-password`,
  })
  return response?.data
}
