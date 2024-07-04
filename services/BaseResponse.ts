import { z } from 'zod'

export const HttpBaseResponseMetaSchema = z.object({
  status: z.number(),
  success: z.boolean(),
  message: z.string(),
})

export const httpGetListResponseSchemaBuilder = <T extends z.ZodType>(schema: T) => {
  return z.object({
    status: z.number(),
    success: z.boolean(),
    message: z.string(),
    data: z
      .object({
        data: z.array(schema).optional(),
        pagination: z
          .object({
            currentPage: z.number(),
            currentPageFront: z.number(),
            total: z.number(),
            totalPages: z.number(),
            totalPagesFront: z.number(),
          })
          .optional(),
      })
      .optional(),
  })
}

export const HttpGetListResponseSchema = httpGetListResponseSchemaBuilder(z.any())
export type HttpGetListResponse = z.infer<typeof HttpGetListResponseSchema>

export const httpGetDetailResponseSchemaBuilder = <T extends z.ZodType>(schema: T) => {
  return z.object({
    status: z.number(),
    success: z.boolean(),
    message: z.string(),
    data: schema.optional(),
  })
}

export const HttpGetDetailResponseSchema = httpGetDetailResponseSchemaBuilder(z.any())
export type HttpGetDetailResponse = z.infer<typeof HttpGetDetailResponseSchema>

export const placeholderListBuilder = (): HttpGetListResponse => ({
  status: 200,
  success: true,
  message: '',
  data: {
    pagination: {
      currentPage: 0,
      currentPageFront: 0,
      total: 0,
      totalPages: 0,
      totalPagesFront: 0,
    },
    data: [],
  },
})

export const placeholderDetailBuilder = (): HttpGetDetailResponse => ({
  status: 200,
  success: true,
  message: '',
  data: {},
})
