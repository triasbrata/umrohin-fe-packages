import apiServices from '@apps/services'
import { mainInstance } from '@apps/split/services/apiService'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'

// TODO: In experimental
export const useAuthRefreshToken = () => {
  const { data: session, update: updateSession } = useSession()

  const refreshToken = async () => {
    try {
      // const url = `${process.env.NEXT_PUBLIC_STAGING_API_URL}/auth/admin/refresh`
      // const { data: res } = await axios.post<AdminAuthRefreshResponse>(url, null, {
      //   headers: {
      //     'x-jwt-refresh': session?.user.refreshToken ?? '',
      //   },
      // })
      const res = await apiServices.auth.adminRefresh({
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

// TODO: In experimental
export const useAxiosAuth = () => {
  const { data: session } = useSession()
  const refreshToken = useAuthRefreshToken()

  useEffect(() => {
    const requestIntercept = mainInstance.interceptors.request.use(
      (config) => {
        if (!config.headers.Authorization) {
          config.headers['Authorization'] = `Bearer ${session?.user.jwtToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    const responseIntercept = mainInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error.config
        if (prevRequest.response.status === 401 && !prevRequest.sent) {
          prevRequest.sent = true
          await refreshToken()
          prevRequest.headers['Authorization'] = `Bearer ${session?.user.jwtToken}`
          return mainInstance(prevRequest)
        }
        return Promise.reject(error)
      }
    )

    return () => {
      mainInstance.interceptors.request.eject(requestIntercept)
      mainInstance.interceptors.response.eject(responseIntercept)
    }
  }, [session])

  return mainInstance
}
