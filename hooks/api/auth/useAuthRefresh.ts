import apiServices from '@apps/packages/services'
import { useSession } from 'next-auth/react'

export const useAuthRefreshToken = () => {
  const { data: session, update: updateSession } = useSession()

  const refreshToken = async () => {
    try {
      const res = await apiServices.auth.adminRefresh({
        body: {
          refresh_token: session?.user.refreshToken ?? '',
        },
      })

      await updateSession({
        jwtToken: res.data?.access_token,
        refreshToken: res.data?.refreshToken,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return refreshToken
}
