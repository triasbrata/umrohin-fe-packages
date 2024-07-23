import { queryKeyMasterFlightTicket } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  MasterFlightTicketListParams,
  MasterFlightTicketListResponse,
  MasterFlightTicketListResponseSchema,
} from '@apps/packages/services/master-flight-ticket'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type useMasterFlightTicketListConfig = {
  queryKey?: QueryKey
  params?: MasterFlightTicketListParams
  options?: UseQueryOptions<MasterFlightTicketListResponse>
}

export const useMasterFlightTicketList = (opt?: useMasterFlightTicketListConfig) => {
  const {
    queryKey = [queryKeyMasterFlightTicket.MASTER_FLIGHT_TICKET_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MasterFlightTicketListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterFlightTicket.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MasterFlightTicketListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
