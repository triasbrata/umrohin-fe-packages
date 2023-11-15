import { type DefaultUser, type DefaultSession } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'

interface UserAccount {
  userID: string
  userName: string
  jwtToken: string
  refreshToken: string
  userPermission: {
    [key: string]: {
      active: boolean
      name: string
    }
  }
}

declare module 'next-auth' {
  interface Session {
    user: UserAccount & DefaultSession['user']
  }

  interface User extends DefaultUser, UserAccount {}
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT, UserAccount {}
}
