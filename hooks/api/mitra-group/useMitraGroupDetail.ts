import { queryKeyMitraGroup } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderDetailBuilder } from '@apps/packages/services/BaseResponse'
import { MitraGroupDetailParams, MitraGroupDetailResponse } from '@apps/packages/services/mitra-group'
import { QueryKey, UseQueryOptions, useQueryClient, useQuery } from '@tanstack/react-query'
import { useEffect, useMemo } from 'react'

import { useAuthRefreshToken } from '../auth'

type useGroupDetailConfig = {
  queryKey?: QueryKey
  params?: MitraGroupDetailParams
  options?: UseQueryOptions<MitraGroupDetailResponse>
  enabled: boolean
}

export const useGroupDetail = (opt?: useGroupDetailConfig) => {
  const { queryKey = [queryKeyMitraGroup.MITRA_GROUP_GET_DETAIL], params = { id: 0 }, options, enabled } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MitraGroupDetailResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderDetailBuilder(),
    []
  )
  const refreshToken = useAuthRefreshToken()
  const query = useQuery({
    queryKey,
    queryFn: () => apiServices.mitraGroup.getDetail({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return response
    },
    enabled: params.id !== 0 && enabled,
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
