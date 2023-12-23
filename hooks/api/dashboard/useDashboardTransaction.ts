import { queryKeyDashboard } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderDetailBuilder } from '@apps/packages/services/BaseResponse'
import { DashboardTransactionResponse } from '@apps/packages/services/dashboard'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'

import { useAuthRefreshToken } from '../auth'

type useDashboardTransactionConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<DashboardTransactionResponse>
}

export const useDashboardTransaction = (opt?: useDashboardTransactionConfig) => {
  const { queryKey = [queryKeyDashboard.DASHBOARD_TRANSACTION], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: DashboardTransactionResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderDetailBuilder(),
    []
  )
  const refreshToken = useAuthRefreshToken()
  const query = useQuery({
    queryKey,
    queryFn: () => apiServices.dashboard.getDashboardTransaction(),
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
