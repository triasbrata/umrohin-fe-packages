import { common } from '@apps/packages/lib/constants'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { z } from 'zod'

import { httpGetDetailResponseSchemaBuilder } from '../BaseResponse'
import { apiCall } from '../apiService'

const endpointPackageDetail = `${common.ROOT_ENDPOINT}/homepage/package/detail`

//result, response
export const CustomerDetailPackageResultSchema = z.object({
  package_id: z.string().optional(),
  agency_id: z.string().optional(),
  name: z.string().optional(),
  is_package_plus: z.boolean().optional(),
  thematic_id: z.string().optional(),
  desc: z.string().optional().nullable(),
  term_condition: z.string().optional().nullable(),
  created_by: z.string().optional(),
  updated_by: z.string().optional(),
  updated_at: z.string().optional(),
  status: z.number().optional(),
  is_highlight: z.boolean().optional(),
  agency_name: z.string().optional(),
  agency_image: z.string().optional(),
  agency_certificate_number: z.string().optional(),
})
export const CustomerDetailPackageResponseSchema = httpGetDetailResponseSchemaBuilder(CustomerDetailPackageResultSchema)
export type CustomerDetailPackageResponse = z.infer<typeof CustomerDetailPackageResponseSchema>

//id params
export const CustomerDetailPackageParamsSchema = z.object({ id: z.number() })
export type CustomerDetailPackageParams = z.infer<typeof CustomerDetailPackageParamsSchema>

export const getDetail = async <ResponseType = CustomerDetailPackageResponse>({
  params,
  options,
}: {
  params: CustomerDetailPackageParams
  options?: AxiosRequestConfig
}) => {
  const { id } = params
  const response: AxiosResponse<ResponseType> = await apiCall({
    ...options,
    method: 'get',
    url: `${endpointPackageDetail}/${id}`,
  })
  return response?.data
}

// "package_id": "2",
// "agency_id": "2",
// "name": "Umroh Parenting Desember Program 5 Hari Tahun 2023 dari Welch (Persero) Tbk Travel Haji/Umroh",
// "is_package_plus": true,
// "thematic_id": "2",
// "desc": null,
// "term_condition": null,
// "created_by": "5",
// "updated_by": "2",
// "updated_at": "2023-11-24T16:08:44.356Z",
// "status": 1,
// "is_highlight": true,
// "agency_name": "Salim Travel",
// "agency_image": "https://umrohin-dev.sgp1.digitaloceanspaces.com/images/1698682072212e9dcf430ceb460441002f636.jpg",
// "agency_certificate_number": "201"
