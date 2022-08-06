# ⚡ Ditto

Base Next.JS project with typescript, chakra and auth0 implementation.

## 🗒️ Notes

- We have implemented automatic account consolidation after login to prevent the user from unintentionally ending up with too many accounts.

## ⚙️ Steup

This project uses yarn as its dependency manager. To install them use the command below:

```bash
yarn install
```

If you don't have yarn installed, follow [this](https://classic.yarnpkg.com/lang/en/docs/install) tutorial.

## 📙 Requirements

Make sure you have Node 16 or a higher version installed.

## 🎨 Deisgn

The visual part is all done using [Chakra UI](https://chakra-ui.com/) and its dependencies.

In preference to its components to maintain visual cohesion.

## ⚙️ Settings

All project settings are done using **environment variables**.

The `.env.example` file contains a template with everything you need to configure.

### 🔒 Auth0

If you don't know how to configure auth0, see [this](https://auth0.com/docs/quickstart/webapp/nextjs/01-login) material.

In the current configuration, in addition to the default, we also have the possibility to manipulate user metadata. If you don't know what it is, read [this](https://auth0.com/docs/manage-users/user-accounts/metadata) documentation.

#### User preferences

We provide an abstraction of the [user metadata](https://auth0.com/docs/manage-users/user-accounts/metadata) api through the `getPreferences` and `setPreferences` methods on the API object defined in `lib/auth0`.

#### Required scopes

We have the following scopes configured in auth0 client:

- `openid` to returns the *sub* claim, which uniquely identifies the user.
- `profile` to get basic profile information.
- `email` to get *email* and *email_verified* information.

For work with user metadata we need 3 another scopes:

- `read:current_user`
- `read:current_user_metadata`
- `create:current_user_metadata`
- `update:current_user_metadata`
- `delete:current_user_metadata`

In Auth0 application (server) you need enable:

- `read:users` in the Auth0 Management API to consolidate accounts after login.
