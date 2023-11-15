import { z } from 'zod'

type ApiResponseValidationType<T> = {
  response: T
  schema: z.ZodType<T>
  placeholderData: T
  url?: string
}

export const apiResponseValidation = <T>({ response, schema, placeholderData, url }: ApiResponseValidationType<T>) => {
  const parseData = schema.safeParse(response)
  if (parseData.success) return parseData.data
  console.error(process.env.NODE_ENV === 'development' && url ? `[${url}] INVALID RESPONSE!` : 'INVALID RESPONSE!')
  console.error({ response, parseData })
  return placeholderData
}
