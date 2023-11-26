import { queryKeyHomepage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderDetailBuilder } from '@apps/packages/services/BaseResponse'
import {
  HomepageStaticTermsAndConditionsResponse,
  HomepageStaticTermsAndConditionsResponseSchema,
} from '@apps/packages/services/homepage'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

type useHomepageStaticTermsAndConditionsConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<HomepageStaticTermsAndConditionsResponse>
}

export const useTermsAndConditions = (opt?: useHomepageStaticTermsAndConditionsConfig) => {
  const { queryKey = [queryKeyHomepage.TERMS_AND_CONDITIONS], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: HomepageStaticTermsAndConditionsResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderDetailBuilder(),
    []
  )

  return useQuery<HomepageStaticTermsAndConditionsResponse>({
    queryKey,
    queryFn: () => apiServices.homepage.getTermsAndConditions(),
    placeholderData,
    refetchOnWindowFocus: false,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: HomepageStaticTermsAndConditionsResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
