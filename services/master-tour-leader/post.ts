import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'
import { zfd } from 'zod-form-data'

import { apiCall } from '../apiService'

export const TourLeaderCreateItemBodySchema = zfd.formData({
  name: zfd.text(),
  short_description: zfd.text(),
  description: zfd.text(),
  year_experience: zfd.text(),
  price: zfd.text(),
  discount: zfd.text(),
  status: zfd.text(),
  featured_image: zfd.file(),
  image: zfd.file(),
  skills: zfd.text(),
  languages: zfd.text(),
  type: zfd.text(),
})

export type TourLeaderCreateItemBody = z.infer<typeof TourLeaderCreateItemBodySchema>

export const TourLeaderCreateItemResultSchema = z.object({
  id: z.string(),
  name: z.string(),
  short_description: z.string(),
  description: z.string().optional(),
  year_experience: z.number(),
  price: z.number(),
  discount: z.number().optional(),
  status: z.string(),
  featured_image: z.string(),
  image: z.string(),
  skills: z.string().array(),
  languages: z.string().array(),
  type: z.string(),
})
export type TourLeaderCreateItemResult = z.infer<typeof TourLeaderCreateItemResultSchema>

export const TourLeaderCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(TourLeaderCreateItemResultSchema)
export type TourLeaderCreateItemResponse = z.infer<typeof TourLeaderCreateItemResponseSchema>

export const createItem = async <ResponseType = TourLeaderCreateItemResponse>({
  body,
  options,
}: {
  body: TourLeaderCreateItemBody
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
    url: '/v1/leaders',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}

// import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
// import { AxiosRequestConfig, AxiosResponse } from 'axios'
// import { z } from 'zod'
// import { zfd } from 'zod-form-data'

// import { apiCall } from '../apiService'

// export const TourLeaderCreateItemBodySchema = zfd.formData({
//   name: zfd.text(),
//   short_description: zfd.text(),
//   description: zfd.text(),
//   year_experience: zfd.text(),
//   price: zfd.text(),
//   discount: zfd.text().optional(),
//   status: zfd.text(),
//   featured_image: zfd.file(),
//   image: zfd.file(),
//   skills: zfd.text(),
//   languages: zfd.text(),
//   type: zfd.text(),
// })

// export type TourLeaderCreateItemBody = z.infer<typeof TourLeaderCreateItemBodySchema>

// export const TourLeaderCreateItemResultSchema = z.object({
//   id: z.string(),
//   name: z.string(),
//   short_description: z.string(),
//   description: z.string().optional(),
//   year_experience: z.string(),
//   price: z.string(),
//   discount: z.string().optional(),
//   status: z.string(),
//   featured_image: z.string(),
//   image: z.string(),
//   skills: z.array(z.string()),
//   languages: z.array(z.string()),
//   type: z.string(),
// })
// export type TourLeaderCreateItemResult = z.infer<typeof TourLeaderCreateItemResultSchema>

// export const TourLeaderCreateItemResponseSchema = httpGetDetailResponseSchemaBuilder(TourLeaderCreateItemResultSchema)
// export type TourLeaderCreateItemResponse = z.infer<typeof TourLeaderCreateItemResponseSchema>

// export const createItem = async <ResponseType = TourLeaderCreateItemResponse>({
//   body,
//   options,
// }: {
//   body: TourLeaderCreateItemBody
//   options?: AxiosRequestConfig
// }) => {
//   const formData = new FormData()

//   Object.entries(body).forEach(([key, value]) => {
//     if (typeof value === 'object' && value instanceof File) {
//       formData.append(key, value)
//     } else if (Array.isArray(value)) {
//       formData.append(key, value.join(','))
//     } else {
//       formData.append(key, value.toString())
//     }
//   })

//   const response: AxiosResponse<ResponseType> = await apiCall({
//     data: formData,
//     ...options,
//     method: 'post',
//     url: '/v1/leaders',
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   })
//   return response?.data
// }
