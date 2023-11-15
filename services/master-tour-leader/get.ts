import { z } from 'zod'

export const MasterTourLeaderListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  icon_url: z.string(),
  banner_url: z.string(),
  is_highlight: z.boolean(),
  status: z.custom<0 | 1>(),
})

export type MasterTourLeaderListItem = z.infer<typeof MasterTourLeaderListItemSchema>
