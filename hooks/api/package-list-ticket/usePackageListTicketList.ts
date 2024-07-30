import { queryKeyPackageListTicket } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import {
  PackageListTicketListParams,
  PackageListTicketListResponse,
  PackageListTicketListResponseSchema,
} from '@apps/packages/services/package-list-ticket'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'

type usePackageListTicketListConfig = {
  queryKey?: QueryKey
  params?: PackageListTicketListParams
  options?: UseQueryOptions<PackageListTicketListResponse>
}

export const usePackageListTicketList = (opt?: usePackageListTicketListConfig) => {
  const {
    queryKey = [queryKeyPackageListTicket.PACKAGE_LIST_TICKET_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: PackageListTicketListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.packageListTicket.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: PackageListTicketListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
