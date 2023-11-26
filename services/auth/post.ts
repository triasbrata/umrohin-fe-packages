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

export const UserCheckPhoneNumberBodySchema = z.object({
  phone_number: z.string(),
})

export type UserCheckPhoneNumberBody = z.infer<typeof UserCheckPhoneNumberBodySchema>

export const UserCheckPhoneNumberResultSchema = z.object({
  available_status: z.boolean(),
})

export type UserCheckPhoneNumberResult = z.infer<typeof UserCheckPhoneNumberResultSchema>

export const UserCheckPhoneNumberResponseSchema = httpGetDetailResponseSchemaBuilder(UserCheckPhoneNumberResultSchema)

export type UserCheckPhoneNumberResponse = z.infer<typeof UserCheckPhoneNumberResponseSchema>

export const userCheckPhoneNumber = async <ResponseType = UserCheckPhoneNumberResponse>({
  body,
  options,
}: {
  body: UserCheckPhoneNumberBody
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

export const UserSignUpBodySchema = z.object({
  phone_number: z.string(),
  name: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
})

export type UserSignUpBody = z.infer<typeof UserSignUpBodySchema>

export const UserSignUpResultSchema = z.object({
  token: z.string(),
  message: z.string(),
})

export type UserSignUpResult = z.infer<typeof UserSignUpResultSchema>

export const UserSignUpResponseSchema = httpGetDetailResponseSchemaBuilder(UserSignUpResultSchema)

export type UserSignUpResponse = z.infer<typeof UserSignUpResponseSchema>

export const userSignUp = async <ResponseType = UserSignUpResponse>({
  body,
  options,
}: {
  body: UserSignUpBody
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

export const UserValidateBodySchema = z.object({
  token: z.string(),
  pin: z.string(),
})

export type UserValidateBody = z.infer<typeof UserValidateBodySchema>

export const UserValidateResponseSchema = z.object({
  meta: HttpBaseResponseMetaSchema,
})

export type UserValidateResponse = z.infer<typeof UserValidateResponseSchema>

export const userValidate = async <ResponseType = UserValidateResponse>({
  body,
  options,
}: {
  body: UserValidateBody
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

export const UserChangePasswordBodySchema = z.object({
  token: z.string(),
  old_password: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
})

export type UserChangePasswordBody = z.infer<typeof UserChangePasswordBodySchema>

export const UserChangePasswordResponseSchema = z.object({
  meta: HttpBaseResponseMetaSchema,
})

export type UserChangePasswordResponse = z.infer<typeof UserChangePasswordResponseSchema>

export const userChangePassword = async <ResponseType = UserChangePasswordResponse>({
  body,
  options,
}: {
  body: UserChangePasswordBody
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

export const UserRefreshHeadersSchema = z.object({
  'x-jwt-refresh': z.string(),
})

export type UserRefreshHeaders = z.infer<typeof UserRefreshHeadersSchema>

export const UserRefreshResultSchema = z.object({
  userID: z.string(),
  userName: z.string(),
  jwtToken: z.string(),
  userPermission: z.record(
    z.string(),
    z.object({
      active: z.boolean(),
      name: z.string(),
    })
  ),
})

export type UserRefreshResult = z.infer<typeof UserRefreshResultSchema>

export const UserRefreshResponseSchema = httpGetDetailResponseSchemaBuilder(UserRefreshResultSchema)

export type UserRefreshResponse = z.infer<typeof UserRefreshResponseSchema>

export const userRefresh = async <ResponseType = UserRefreshResponse>({
  headers,
  options,
}: {
  headers: UserRefreshHeaders & AxiosRequestConfig['headers']
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
