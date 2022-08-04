import {
  handleAuth,
  handleLogin,
  handleProfile,
  AfterRefetch,
} from '@auth0/nextjs-auth0'
import { ManagementClient } from 'auth0'

export default handleAuth({
  async profile(req, res) {
    try {
      const refetch = true
      const afterRefetch: AfterRefetch = (req, res, session) => {
        const id = session.user.sub
        const token = session.accessToken
        const scope = process.env.AUTH0_SCOPE
        const domain = process.env.AUTH0_ISSUER_BASE_URL!.replace(
          'https://',
          '',
        )
        const api = new ManagementClient({ token, domain, scope })
        session.user.roles = api.getUserRoles({ id })
        return session
      }
      await handleProfile(req, res, { refetch, afterRefetch })
    } catch ({ message }) {
      res.status(500).end(message)
    }
  },
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
          scope: process.env.AUTH0_SCOPE,
        },
      })
    } catch ({ message }) {
      res.status(500).end(message)
    }
  },
})
