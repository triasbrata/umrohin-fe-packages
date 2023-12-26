import { queryKeyMitraPackage } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  PackageActivationItemBody,
  PackageActivationItemParams,
  PackageActivationItemResponse,
} from '@apps/packages/services/mitra-package'
import { useState } from 'react'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<PackageActivationItemResponse, PackageActivationItemParams>
}

export const useActivationPackage = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  return useMutateItem({
    successMessage: () => successMessage,
    errorMessage: () => errorMessage,
    invalidateQueryKey: [queryKeyMitraPackage.MITRA_PACKAGE_LIST],
    mutationFn: (params: PackageActivationItemParams & PackageActivationItemBody) => {
      const { id, ...body } = params
      setSuccessMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      setErrorMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      return apiServices.mitraPackage.activationItem({ params, body })
    },
    mutationOptions,
  })
}
