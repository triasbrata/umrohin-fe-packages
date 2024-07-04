import { ReactNode } from 'react'
import { z } from 'zod'

export const CheckboxOptionItemSchema = z.object({
  label: z.custom<ReactNode>(),
  value: z.string(),
  isSelected: z.boolean().optional(),
})

export type CheckboxOptionItem = z.infer<typeof CheckboxOptionItemSchema>

export const BasicItemTypeSchema = z.object({
  id: z.string(),
  name: z.string(),
})

export type BasicItemType = z.infer<typeof BasicItemTypeSchema>
