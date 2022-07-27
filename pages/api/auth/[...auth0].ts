import { handleAuth, handleLogin } from '@auth0/nextjs-auth0'

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          audience: `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/`,
          scope: process.env.AUTH0_SCOPE,
        },
      })
    } catch ({ message }) {
      res.status(400).end(message)
    }
  },
})
