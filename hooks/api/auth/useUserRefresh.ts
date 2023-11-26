import apiServices from '@apps/packages/services'
import { useSession } from 'next-auth/react'

// TODO: In experimental
export const useUserRefreshToken = () => {
  const { data: session, update: updateSession } = useSession()

  const refreshToken = async (token: string) => {
    try {
      // const url = `${process.env.NEXT_PUBLIC_STAGING_API_URL}/auth/admin/refresh`
      // const { data: res } = await axios.post<AdminAuthRefreshResponse>(url, null, {
      //   headers: {
      //     'x-jwt-refresh': session?.user.refreshToken ?? '',
      //   },
      // })
      const res = await apiServices.auth.userRefresh({
        headers: {
          'x-jwt-refresh': session?.user.refreshToken ?? '',
        },
      })
      await updateSession({
        jwtToken: res.result?.jwtToken,
        userPermission: res.result?.userPermission,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return refreshToken
}
