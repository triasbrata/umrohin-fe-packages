import { queryKeyDashboard } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderDetailBuilder } from '@apps/packages/services/BaseResponse'
import { DashboardResponse } from '@apps/packages/services/dashboard'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'

import { useAuthRefreshToken } from '../auth'

type useDashboardConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<DashboardResponse>
}

export const useDashboard = (opt?: useDashboardConfig) => {
  const { queryKey = [queryKeyDashboard.DASHBOARD_CUSTOMERS], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: DashboardResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderDetailBuilder(),
    []
  )

  const refreshToken = useAuthRefreshToken()
  const query = useQuery({
    queryKey,
    queryFn: () => apiServices.dashboard.getDashboard(),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return response
    },
    ...options,
  })
  const { data: response } = query
  const { status } = response ?? {}

  useEffect(() => {
    if (status !== 401) return
    refreshToken().then(() => query.refetch())
  }, [status])
  return query
}
