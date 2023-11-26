import { queryKeyHomepage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderDetailBuilder } from '@apps/packages/services/BaseResponse'
import {
  HomepageStaticPrivacyPolicyResponse,
  HomepageStaticPrivacyPolicyResponseSchema,
} from '@apps/packages/services/homepage'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

type useHomepageStaticPrivacyPolicyConfig = {
  queryKey?: QueryKey
  options?: UseQueryOptions<HomepageStaticPrivacyPolicyResponse>
}

export const usePrivacyPolicy = (opt?: useHomepageStaticPrivacyPolicyConfig) => {
  const { queryKey = [queryKeyHomepage.PRIVACY_POLICY], options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: HomepageStaticPrivacyPolicyResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderDetailBuilder(),
    []
  )

  return useQuery<HomepageStaticPrivacyPolicyResponse>({
    queryKey,
    queryFn: () => apiServices.homepage.getPrivacyPolicy(),
    placeholderData,
    refetchOnWindowFocus: false,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: HomepageStaticPrivacyPolicyResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
