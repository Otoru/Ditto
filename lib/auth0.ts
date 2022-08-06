import { ManagementClient, UserMetadata, User, AppMetadata } from 'auth0'
import { Session } from '@auth0/nextjs-auth0'

export class Client {
  id: string
  client: ManagementClient

  constructor({ session }: { session: Session }) {
    const token = session.accessToken
    const scope = process.env.AUTH0_SCOPE
    const domain = process.env.AUTH0_ISSUER_BASE_URL!.replace('https://', '')

    this.id = session.user.sub
    this.client = new ManagementClient({ token, domain, scope })
  }

  preferences = (): Promise<UserMetadata | undefined> => {
    return new Promise((resolve, reject) => {
      this.client
        .getUser({ id: this.id })
        .then(({ user_metadata: preferences }) => resolve(preferences))
        .catch((error) => reject(error))
    })
  }

  accounts = ({ email }: { email: string }) => {
    return new Promise((resolve, reject) => {
      this.client
        .getUsersByEmail(email)
        .then((users) => resolve(users))
        .catch(reject)
    })
  }

  account = ({
    id,
  }: {
    id: string
  }): Promise<User<AppMetadata, UserMetadata>> => {
    return new Promise((resolve, reject) => {
      this.client
        .getUser({ id })
        .then((users) => resolve(users))
        .catch(reject)
    })
  }

  merge = ({ primary, secondary }: { primary: string; secondary: string }) => {
    return new Promise((resolve, reject) => {
      this.client
        .linkUsers(secondary, { user_id: primary })
        .then(resolve)
        .catch(reject)
    })
  }
}

export class Server {
  client: ManagementClient

  constructor({ scope }: { scope: string }) {
    const domain = process.env.AUTH0_ISSUER_BASE_URL!.replace('https://', '')
    const clientId = process.env.AUTH0_CLIENT_ID
    const clientSecret = process.env.AUTH0_CLIENT_SECRET
    this.client = new ManagementClient({
      domain,
      scope,
      clientId,
      clientSecret,
    })
  }

  accounts = ({ email }: { email: string }): Promise<User<AppMetadata, UserMetadata>[]> => {
    return new Promise((resolve, reject) => {
      this.client
        .getUsersByEmail(email)
        .then((users) => resolve(users))
        .catch(reject)
    })
  }

  consolidate = async ({ id }: { id: string }) => {
    const user = await this.client.getUser({ id })
    if (!user.email_verified) return

    const accounts = await this.accounts({ email: user.email! })
    
    accounts.forEach(account => {
      if (account.user_id === id) return 
      if (!account.email_verified) return
      account.identities?.forEach(({ provider, user_id }) => {
        user.identities?.forEach(({ user_id: primary }) => {
          if (primary !== user_id) {
            this.client.linkUsers(id, { provider, user_id })
          }
        })
      })
    });
  }
}
