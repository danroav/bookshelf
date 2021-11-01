/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
// 🐨 you're going to need this:
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import {client} from 'utils/api-client.exercise'
import {useAsync} from 'utils/hooks'
import {FullPageSpinner} from 'components/lib'
import * as colors from './styles/colors'

async function getUser() {
  const token = await auth.getToken()
  if (token) {
    console.log('Validando Token existente en local storage', token)
    return await client('me', {token})
  } else {
    console.log('No existe token en local storage')
    return null
  }
}
function App() {
  const {
    data: user,
    error,
    isIdle,
    isLoading,
    isSuccess,
    isError,
    run,
    setData: setUser,
  } = useAsync()

  // 🐨 useState for the user
  //const [user, setUser] = React.useState()
  // 🐨 create a login function that calls auth.login then sets the user
  // 💰 const login = form => auth.login(form).then(u => setUser(u))
  const login = formData => run(auth.login(formData))
  //auth.login(formData).then(loggedUser => setUser(loggedUser))
  // 🐨 create a registration function that does the same as login except for register
  const register = formData => run(auth.register(formData))
  //auth.register(formData).then(registeredUser => setUser(registeredUser))
  // 🐨 create a logout function that calls auth.logout() and sets the user to null
  const logout = () => {
    auth.logout().then(() => setUser(null))
  }
  // 🐨 if there's a user, then render the AuthenticatedApp with the user and logout
  // 🐨 if there's not a user, then render the UnauthenticatedApp with login and register

  React.useEffect(() => {
    run(getUser())
  }, [run])

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }
  if (isError) {
    return (
      <div
        css={{
          color: colors.danger,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    )
  }
  if (isSuccess) {
    return user ? (
      <AuthenticatedApp user={user} logout={logout} />
    ) : (
      <UnauthenticatedApp login={login} register={register} />
    )
  }
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
