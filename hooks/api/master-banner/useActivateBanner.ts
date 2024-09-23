import { queryKeyMasterBanners } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import {
  BannerActivationItemBody,
  BannerActivationItemParams,
  BannerActivationItemResponse,
} from '@apps/packages/services/master-banner'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<BannerActivationItemResponse, BannerActivationItemBody>
}

type ParamsType = BannerActivationItemParams & BannerActivationItemBody

export const useActivateBanner = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterBanners.MASTER_BANNER_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterBanner.activateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
