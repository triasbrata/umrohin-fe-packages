import { queryKeyCustomers } from '@apps/packages/lib/constants'
import apiServices from '@apps/services'
import {
  CustomerActivationItemBody,
  CustomerActivationItemParams,
  CustomerActivationItemResponse,
} from '@apps/packages/services/customers'
import { useState } from 'react'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<CustomerActivationItemResponse, CustomerActivationItemParams>
}

export const useActivationCustomer = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  const [successMessage, setSuccessMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  return useMutateItem({
    successMessage: () => successMessage,
    errorMessage: () => errorMessage,
    invalidateQueryKey: [queryKeyCustomers.CUSTOMER_LIST],
    mutationFn: (params: CustomerActivationItemParams & CustomerActivationItemBody) => {
      const { id, ...body } = params
      setSuccessMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      setErrorMessage(body.status === 1 ? 'Data berhasil diaktifkan' : 'Data berhasil dinonaktifkan')
      return apiServices.customer.activationItem({ params, body })
    },
    mutationOptions,
  })
}
