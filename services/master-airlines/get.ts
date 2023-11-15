import { z } from 'zod'

export const MasterAirlinesListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  logo_url: z.string(),
  is_highlight: z.boolean(),
  status: z.custom<0 | 1>(),
})

export type MasterAirlinesListItem = z.infer<typeof MasterAirlinesListItemSchema>
