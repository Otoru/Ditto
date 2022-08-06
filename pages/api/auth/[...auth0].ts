import {
  handleAuth,
  handleLogin,
  AfterRefetch,
  AfterCallback,
  handleProfile,
  handleCallback,
} from '@auth0/nextjs-auth0'

import { Client, Server } from 'lib/auth0'

export default handleAuth({
  async callback(req, res) {
    try {
      const afterCallback: AfterCallback = async (req, res, session, state) => {
        const api = new Server({ scope: 'read:users' })
        await api.consolidate({ id: session.user.sub })
        return session
      }

      await handleCallback(req, res, { afterCallback });
    } catch ({ message }) {
      res.status(500).end(message);
    }
  },
  async profile(req, res) {
    try {
      const refetch = true
      const afterRefetch: AfterRefetch = async (req, res, session) => {
        const api = new Client({ session })
        session.user.preferences =  await api.preferences()

        return session
      }

      await handleProfile(req, res, { refetch, afterRefetch })
    } catch ({ message }) {
      res.status(500).end(JSON.stringify(message))
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
