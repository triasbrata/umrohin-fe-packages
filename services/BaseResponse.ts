import { z } from 'zod'

export const HttpBaseResponseMetaSchema = z.object({
  code: z.number(),
  message: z.string(),
  response_time: z.number(),
  success: z.boolean(),
})

export type HttpBaseResponseMeta = z.infer<typeof HttpBaseResponseMetaSchema>

export const HttpGetListResponseMetaSchema = HttpBaseResponseMetaSchema.extend({
  pagination: z
    .object({
      max_page: z.number(),
      current: z.number(),
      size: z.number(),
      total: z.number(),
    })
    .optional(),
})

export const httpGetListResponseSchemaBuilder = <T extends z.ZodType>(schema: T) => {
  return z.object({
    meta: HttpGetListResponseMetaSchema,
    result: z.array(schema).optional(),
  })
}

export const HttpGetListResponseSchema = httpGetListResponseSchemaBuilder(z.any())

export type HttpGetListResponse = z.infer<typeof HttpGetListResponseSchema>

export const httpGetDetailResponseSchemaBuilder = <T extends z.ZodType>(schema: T) => {
  return z.object({
    meta: HttpBaseResponseMetaSchema,
    result: schema.optional(),
  })
}

export const HttpGetDetailResponseSchema = httpGetDetailResponseSchemaBuilder(z.any())

export type HttpGetDetailResponse = z.infer<typeof HttpGetDetailResponseSchema>

export const placeholderListBuilder = (): HttpGetListResponse => ({
  meta: {
    code: 200,
    message: '',
    response_time: 0,
    success: true,
    pagination: {
      max_page: 0,
      current: 0,
      size: 0,
      total: 0,
    },
  },
  result: [],
})

export const placeholderDetailBuilder = (): HttpGetDetailResponse => ({
  meta: {
    code: 200,
    message: '',
    response_time: 0,
    success: true,
  },
  result: {},
})
