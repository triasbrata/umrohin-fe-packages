import { queryKeyMasterPackageHaji } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  MasterPackageHajiItemBody,
  MasterPackageHajiItemParams,
  MasterPackageHajiItemResponse,
} from '@apps/packages/services/master-package-haji'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<MasterPackageHajiItemResponse, MasterPackageHajiItemBody>
}

type ParamsType = MasterPackageHajiItemParams & MasterPackageHajiItemBody

export const useActivatePackageHaji = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyMasterPackageHaji.MASTER_PACKAGE_HAJI_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterPackageHaji.activateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
