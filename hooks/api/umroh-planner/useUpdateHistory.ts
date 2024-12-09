import apiServices from '@apps/packages/services'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import {
  TransactionUmrohPlannerUpdateHistoryItemBody,
  TransactionUmrohPlannerUpdateHistoryResponse,
} from '@apps/packages/services/transaction-umroh-planner'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<
    TransactionUmrohPlannerUpdateHistoryResponse,
    TransactionUmrohPlannerUpdateHistoryItemBody
  >
}

type ParamsType = TransactionUmrohPlannerUpdateHistoryItemBody

export const useUpdateHistory = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: ['transactionUmrohPlannerList'],
    mutationFn: (body: ParamsType) => {
      return apiServices.transactionUmrohPlanner.updateHistory({ body })
    },
    mutationOptions,
  })
}
