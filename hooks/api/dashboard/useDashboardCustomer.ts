import { queryKeyDashboard } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderDetailBuilder } from '@apps/packages/services/BaseResponse'
import { DashboardCustomerResponse } from '@apps/packages/services/dashboard'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'

import { useAuthRefreshToken } from '../auth'

type useDashboardCustomerConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<DashboardCustomerResponse>
}

export const useDashboardCustomer = (opt?: useDashboardCustomerConfig) => {
  const { queryKey = [queryKeyDashboard.DASHBOARD_CUSTOMERS], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: DashboardCustomerResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderDetailBuilder(),
    []
  )
  const refreshToken = useAuthRefreshToken()
  const query = useQuery({
    queryKey,
    queryFn: () => apiServices.dashboard.getDashboardCustomer(),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return response
    },
    ...options,
  })
  const { data: response } = query
  const { code } = response?.meta ?? {}

  useEffect(() => {
    if (code !== 401) return
    refreshToken().then(() => query.refetch())
  }, [code])
  return query
}
