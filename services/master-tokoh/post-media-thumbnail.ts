import { httpGetDetailResponseSchemaBuilder } from '@apps/packages/services/BaseResponse'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { apiCall } from '../apiService'

export const TokohUploadMediaThumbnailItemBodySchema = z.object({
  thumbnail: z.any(),
})

export type TokohUploadMediaThumbnailItemBody = z.infer<typeof TokohUploadMediaThumbnailItemBodySchema>

export const TokohUploadMediaThumbnailItemResultSchema = z.string()
export type TokohUploadMediaThumbnailItemResult = z.infer<typeof TokohUploadMediaThumbnailItemResultSchema>

export const TokohUploadMediaThumbnailItemResponseSchema = httpGetDetailResponseSchemaBuilder(
  TokohUploadMediaThumbnailItemResultSchema
)
export type TokohUploadMediaThumbnailItemResponse = z.infer<typeof TokohUploadMediaThumbnailItemResponseSchema>

export const tokohUploadMediaThumbnail = async <ResponseType = TokohUploadMediaThumbnailItemResponse>({
  body,
  options,
}: {
  body: TokohUploadMediaThumbnailItemBody
  options?: AxiosRequestConfig
}) => {
  const response: AxiosResponse<ResponseType> = await apiCall({
    data: body,
    ...options,
    method: 'post',
    url: '/v1/actions_leader/upload_thumbnail',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response?.data
}
