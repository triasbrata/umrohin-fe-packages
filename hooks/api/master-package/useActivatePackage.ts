import { queryKeyMasterPackage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterPackageItemBody,
  MasterPackageItemParams,
  MasterPackageItemResponse,
} from '@apps/packages/services/master-package'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterPackageItemResponse, MasterPackageItemBody>
}

type ParamsType = MasterPackageItemParams & MasterPackageItemBody

export const useActivatePackage = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterPackage.MASTER_PACKAGE_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterPackage.activateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
