import { queryKeyPackageFlightTicket } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  PackageFlightTicketListParams,
  PackageFlightTicketListResponse,
  PackageFlightTicketListResponseSchema,
} from '@apps/packages/services/package-flight-ticket'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type usePackageFlightTicketListConfig = {
  queryKey?: QueryKey
  params?: PackageFlightTicketListParams
  options?: UseQueryOptions<PackageFlightTicketListResponse>
}

export const usePackageFlightTicketList = (opt?: usePackageFlightTicketListConfig) => {
  const {
    queryKey = [queryKeyPackageFlightTicket.PACKAGE_FLIGHT_TICKET_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: PackageFlightTicketListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.packageFlightTicket.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: PackageFlightTicketListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
