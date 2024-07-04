// import { signOut } from 'next-auth/react'

const unauthorized = () => {
  console.error('UNAUTHORIZED')
  //   signOut()
}

const errorNetwork = () => {
  console.error('ERR_NETWORK')
}

const requestTimeout = () => {
  console.error('REQUEST TIMEOUT')
}

export const errorHandling = (error: any) => {
  if (error.code === 'ERR_NETWORK') {
    errorNetwork()
  } else if (error.code === 'ECONNABORTED') {
    requestTimeout()
  }
  if (error.response?.status === 401) {
    unauthorized()
  }
}
