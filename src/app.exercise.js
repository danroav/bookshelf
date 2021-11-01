/** @jsx jsx */
import {jsx} from '@emotion/core'

import * as React from 'react'
// 🐨 you're going to need this:
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import {client} from 'utils/api-client.exercise'

function App() {
  // 🐨 useState for the user
  const [user, setUser] = React.useState()
  // 🐨 create a login function that calls auth.login then sets the user
  // 💰 const login = form => auth.login(form).then(u => setUser(u))
  const login = formData =>
    auth.login(formData).then(loggedUser => setUser(loggedUser))
  // 🐨 create a registration function that does the same as login except for register
  const register = formData =>
    auth.register(formData).then(registeredUser => setUser(registeredUser))
  // 🐨 create a logout function that calls auth.logout() and sets the user to null
  const logout = () => auth.logout().then(() => setUser(null))
  // 🐨 if there's a user, then render the AuthenticatedApp with the user and logout
  // 🐨 if there's not a user, then render the UnauthenticatedApp with login and register

  React.useEffect(() => {
    auth.getToken().then(
      token => {
        if (token) {
          console.log('Validando Token existente en local storage', token)
          client('me', {token}).then(
            data => {
              setUser(data.user)
            },
            reject => {
              console.log('client reject:', reject)
            },
          )
        } else {
          console.log('No existe token en local storage')
          setUser(null)
        }
      },
      reject => {
        console.log('getToken reject', reject)
      },
    )
  }, [])

  return user ? (
    <AuthenticatedApp user={user} logout={logout} />
  ) : (
    <UnauthenticatedApp login={login} register={register} />
  )
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
