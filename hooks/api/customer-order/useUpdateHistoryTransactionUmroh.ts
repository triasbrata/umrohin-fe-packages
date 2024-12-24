import apiServices from '@apps/packages/services'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'
import {
  TransactionUmrohPlannerUpdateHistoryItemBody,
  TransactionUmrohPlannerUpdateHistoryResponse,
} from '@apps/packages/services/transaction-umroh-planner'
import { queryKeyTransactionUmroh } from '@apps/packages/lib/constants/queryKeyTransactionUmroh'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<
    TransactionUmrohPlannerUpdateHistoryResponse,
    TransactionUmrohPlannerUpdateHistoryItemBody
  >
}

type ParamsType = TransactionUmrohPlannerUpdateHistoryItemBody

export const useUpdateHistoryTransactionUmroh = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyTransactionUmroh.TRANSACTION_UMROH_LIST],
    mutationFn: (body: ParamsType) => {
      return apiServices.transactionUmrohPlanner.updateHistory({ body })
    },
    mutationOptions,
  })
}
