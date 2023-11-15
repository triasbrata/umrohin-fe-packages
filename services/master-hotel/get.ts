import { z } from 'zod'

export const MasterHotelListItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  city_id: z.string(),
  city_name: z.string(),
  distance_to_masjidil_haram: z.number(),
  distance_to_masjid_nabawi: z.number(),
  star: z.number(),
  icon_url: z.string(),
  status: z.union([z.literal(0), z.literal(1)]),
})

export type MasterHotelListItem = z.infer<typeof MasterHotelListItemSchema>
