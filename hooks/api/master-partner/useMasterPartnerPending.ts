import { queryKeyMasterPartner } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderDetailBuilder } from '@apps/packages/services/BaseResponse'
import { PendingResponse } from '@apps/packages/services/master-partner'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'
import { useAuthRefreshToken } from '../auth'

type useMasterPartnerPendingConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<PendingResponse>
}

export const useMasterPartnerPending = (opt?: useMasterPartnerPendingConfig) => {
  const { queryKey = [queryKeyMasterPartner.MASTER_PARTNER_PENDING], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: PendingResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderDetailBuilder(),
    []
  )

  const refreshToken = useAuthRefreshToken()
  const query = useQuery({
    queryKey,
    queryFn: () => apiServices.masterPartner.getPending(),
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
