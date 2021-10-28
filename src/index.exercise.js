import * as React from 'react'
import ReactDOM from 'react-dom'
import {Logo} from 'components/logo'
import {Dialog} from '@reach/dialog'
import '@reach/dialog/styles.css'

function LoginForm({onSubmit, buttonText}) {
  const handleSubmitLogin = event => {
    event.preventDefault()
    const [username, password] = event.target.elements
    onSubmit({
      username: username.value,
      password: password.value,
    })
  }
  return (
    <form onSubmit={handleSubmitLogin}>
      <div>
        <label htmlFor="username">User Name:</label>
        <br />
        <input id="username" name="username" />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <br />
        <input id="password" name="password" type="password" />
      </div>
      <div>
        <button type="submit">{buttonText}</button>
      </div>
    </form>
  )
}
function App() {
  const [dialogType, setDialogType] = React.useState('none')
  const openLogin = () => setDialogType('login')
  const openRegister = () => setDialogType('register')
  const closeDialog = () => setDialogType('none')
  function handleSubmitLogin(formData) {
    console.log('login', formData)
  }
  return (
    <div>
      <Dialog
        isOpen={dialogType === 'login'}
        onDismiss={closeDialog}
        aria-label="login"
      >
        <button className="close-button" onClick={closeDialog} children={'x'} />
        <h2>Login</h2>
        <LoginForm onSubmit={handleSubmitLogin} buttonText="login" />
      </Dialog>
      <Dialog
        isOpen={dialogType === 'register'}
        onDismiss={closeDialog}
        aria-label="register"
      >
        <button className="close-button" onClick={closeDialog}>
          <span aria-hidden>×</span>
        </button>
        <h2>Register</h2>
        <div>
          <label htmlFor="username">User Name:</label>
          <br />
          <input name="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input name="password" />
        </div>
      </Dialog>
      <Logo />
      <h1>Bookshelf</h1>
      <button onClick={openLogin}>Login</button>

      <button onClick={openRegister}>Register</button>
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))
