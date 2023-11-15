import { z } from 'zod'

export const AgencyListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  director_name: z.string(),
  phone: z.string(),
  certificate_number: z.number(),
  certificate_year: z.number(),
  office_status: z.string(),
  address: z.string(),
  logo_url: z.string(),
  banner_url: z.string(),
  bank_code: z.string(),
  bank_number: z.string(),
  bank_owner_name: z.string(),
  is_highlight: z.boolean(),
  reject_reason: z.string(),
  verification_status: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  status: z.union([z.literal(0), z.literal(1)]),
})

export type AgencyListItem = z.infer<typeof AgencyListItemSchema>
