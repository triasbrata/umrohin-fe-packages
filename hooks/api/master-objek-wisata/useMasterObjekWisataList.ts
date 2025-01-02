import apiServices from '@apps/packages/services'
import { placeholderListBuilder } from '@apps/packages/services/BaseResponse'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList } from '../BaseMutation'
import { queryKeyMasterObjekWisata } from '@apps/packages/lib/constants/queryKeyMasterObjekWisata'
import {
  ObjekWisataListParams,
  ObjekWisataListResponse,
  ObjekWisataListResponseSchema,
} from '@apps/packages/services/master-objek-wisata'

type useMasterObjekWisataListConfig = {
  queryKey?: QueryKey
  params?: ObjekWisataListParams
  options?: UseQueryOptions<ObjekWisataListResponse>
}

export const useMasterObjekWisataList = (opt?: useMasterObjekWisataListConfig) => {
  const {
    queryKey = [queryKeyMasterObjekWisata.MASTER_OBJEK_WISATA_LIST],
    params = { page: 1, page_size: 10 },
    options,
  } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: ObjekWisataListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.masterObjekWisata.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: ObjekWisataListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
