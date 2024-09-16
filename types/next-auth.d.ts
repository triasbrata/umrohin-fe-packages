import { type DefaultUser, type DefaultSession } from 'next-auth'
import { DefaultJWT } from 'next-auth/jwt'
import { z } from 'zod'

const UserAccountSchema = z.object({
  userID: z.string(),
  userName: z.string(),
  userEmail: z.string(),
  jwtToken: z.string(),
  refreshToken: z.string(),
  userPermission: z
    .record(
      z.string(),
      z.object({
        active: z.boolean(),
        name: z.string(),
      })
    )
    .optional(),
})

type UserAccount = z.infer<typeof UserAccountSchema>
declare module 'next-auth' {
  interface Session {
    user: UserAccount & DefaultSession['user']
  }

  interface User extends DefaultUser, UserAccount {}
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT, UserAccount {}
}
