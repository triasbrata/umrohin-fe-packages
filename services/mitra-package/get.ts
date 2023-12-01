import { UploadFile } from 'antd'
import { z } from 'zod'

import { MasterAirlinesListItemSchema } from '../master-airlines'
import { MasterAirportListItemSchema } from '../master-airport'
import { DummyMasterCityListItemSchema } from '../master-city'
import { MasterFacilityListItemSchema } from '../master-facility'
import { MasterHotelListItemSchema } from '../master-hotel'
import { DummyThematicListItemSchema } from '../master-thematics'
import { MasterTourLeaderListItemSchema } from '../master-tour-leader'
import { MasterTourLocationListItemSchema } from '../master-tour-location'
import { MitraAgencyListItemSchema } from '../mitra-agency'

export const PackageDepartureDateItemSchema = z.object({
  start_date: z.string(),
  end_date: z.string(),
})

export type PackageDepartureDateItem = z.infer<typeof PackageDepartureDateItemSchema>

export const PackageAirlinesItemSchema = z.object({
  id: z.string(),
  airlines: MasterAirlinesListItemSchema.optional(),
  departure: z.object({
    airport: MasterAirportListItemSchema.optional(),
    city: DummyMasterCityListItemSchema.optional(),
  }),
  arrival: z.object({
    airport: MasterAirportListItemSchema.optional(),
    city: DummyMasterCityListItemSchema.optional(),
  }),
  flightDuration: z.string(),
})

export type PackageAirlinesItem = z.infer<typeof PackageAirlinesItemSchema>

export const PackageRoomItemSchema = z.object({
  name: z.string(),
  price: z.number(),
})

export type PackageRoomItem = z.infer<typeof PackageRoomItemSchema>

export const PackageListItemSchema = z.object({
  id: z.string(),
  package_id: z.string(),
  package_name: z.string(),
  agency: MitraAgencyListItemSchema.optional(),
  thematic: DummyThematicListItemSchema.optional(),
  departure_date: z.array(PackageDepartureDateItemSchema),
  airlines: z.array(PackageAirlinesItemSchema),
  hotels: z.array(MasterHotelListItemSchema),
  rooms: z.array(PackageRoomItemSchema),
  tour_locations: z.array(MasterTourLocationListItemSchema),
  tour_leaders: z.array(MasterTourLeaderListItemSchema),
  facilities: z.array(MasterFacilityListItemSchema),
  description: z.string(),
  status: z.union([z.literal(0), z.literal(1), z.literal(2)]),
  thumbnail: z.custom<UploadFile[]>(),
  galleries: z.array(z.object({ image: z.custom<UploadFile[]>() })),
})

export type PackageListItem = z.infer<typeof PackageListItemSchema>
