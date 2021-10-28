// 🐨 you'll need to import React and ReactDOM up here
import * as React from 'react'
import ReactDOM from 'react-dom'
// 🐨 you'll also need to import the Logo component from './components/logo'
import {Logo} from 'components/logo'
import {Dialog} from '@reach/dialog'
import '@reach/dialog/styles.css'
// 🐨 create an App component here and render the logo, the title ("Bookshelf"), a login button, and a register button.
// 🐨 for fun, you can add event handlers for both buttons to alert that the button was clicked
function App() {
  const [dialogType, setDialogType] = React.useState('none')
  const openLogin = () => setDialogType('Login')
  const openRegister = () => setDialogType('Register')
  const closeDialog = () => setDialogType('none')
  return (
    <div>
      <Dialog isOpen={dialogType === 'Login'} onDismiss={closeDialog}>
        <button className="close-button" onClick={closeDialog}>
          <span aria-hidden>×</span>
        </button>
        <h2>Login</h2>
        <p>
          <label htmlFor="username">User Name:</label>
          <br />
          <input name="username" />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <br />
          <input name="password" />
        </p>
      </Dialog>
      <Dialog isOpen={dialogType === 'Register'} onDismiss={closeDialog}>
        <button className="close-button" onClick={closeDialog}>
          <span aria-hidden>×</span>
        </button>
        <h2>Register</h2>
        <p>
          <label htmlFor="username">User Name:</label>
          <br />
          <input name="username" />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <br />
          <input name="password" />
        </p>
      </Dialog>
      <Logo />
      <h1>Bookshelf</h1>
      <button onClick={openLogin}>Login</button>

      <button onClick={openRegister}>Register</button>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
// 🐨 use ReactDOM to render the <App /> to the root element
// 💰 find the root element with: document.getElementById('root')
