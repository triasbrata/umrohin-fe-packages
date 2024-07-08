import { errorHandling } from '@apps/packages/utils'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { getSession } from 'next-auth/react'

// const newAbortSignal = (timeoutMs: number) => {
//   const abortController = new AbortController()
//   setTimeout(() => abortController.abort(), timeoutMs || 0)
//   return abortController.signal
// }

export const createAxiosInstance = ({ baseURL }: { baseURL?: string }) => {
  const axiosInstance = axios.create({ baseURL })

  axiosInstance.interceptors.request.use(async (config) => {
    const session = await getSession()
    if (session) config.headers['Authorization'] = `Bearer ${session?.user.jwtToken}`
    // config.signal = newAbortSignal(7000)
    config.headers.setContentType(config.headers['Content-Type'] ?? 'application/json')
    return config
  })

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      // const session = await getSession()
      // if (error.response?.status === 401) {
      //   try {
      //     const url = `${process.env.NEXT_PUBLIC_STAGING_API_URL}/auth/admin/refresh`
      //     const { data: res } = await axios.post<AdminAuthRefreshResponse>(url, null, {
      //       headers: {
      //         'x-jwt-refresh': session?.user.refreshToken ?? '',
      //       },
      //     })
      //     if (session) {
      //       session.user.jwtToken = res.result?.jwtToken ?? ''
      //       session.user.userPermission = res.result?.userPermission ?? {}
      //     }
      //     if (error.config) error.config.headers['Authorization'] = `Bearer ${session?.user.jwtToken}`
      //     return axiosInstance({ ...error.config })
      //   } catch (error) {
      //     console.error(error)
      //   }
      // }
      return Promise.reject(error)
    }
  )

  return axiosInstance
}

const baseURL = process.env.NEXT_PUBLIC_STAGING_API_V3_URL
export const mainInstance = createAxiosInstance({ baseURL })

export const apiCall = async (options?: AxiosRequestConfig) => {
  try {
    console.log(JSON.stringify(options));
    const response = await mainInstance({ ...options });
    console.log("---------------START-RESPONSE---------------");
    console.log(JSON.stringify(response));
    console.log("---------------END-RESPONSE--------------");
    return response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      errorHandling(error)
      return error.response
    } else if (axios.isCancel(error)) {
      console.error(`[${options?.url}] Operation Cancelled`)
    } else {
      return error as any
    }
  }
}
