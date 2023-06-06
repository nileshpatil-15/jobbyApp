/* eslint-disable prettier/prettier */

import {Component} from 'react'
import Cookie from 'js-cookie'
import './index.css'

export default class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    isErrorShown: false,
  }

  onFailedSubmit = errorMsg => {
    this.setState({errorMsg, isErrorShown: true})
  }

  onSuccessSubmit = jwtToken => {
    const {history} = this.props
    Cookie.set('jwt_token', jwtToken, {expires: 300})
    history.replace('/')
 
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const url = 'https://apis.ccbp.in/login'
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSuccessSubmit(data.jwt_token)
    } else {
      this.onFailedSubmit(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  renderUsernameContainer = () => {
    const {username} = this.state

    return (
      <>
        <label htmlFor="usernameInput" className="credential-label">
          USERNAME
        </label>
        <input
          className="credentials-input "
          id="usernameInput"
          type="text"
          placeholder="Username"
          value={username}
          onChange={this.onChangeUsername}
        />
      </>
    )
  }

  renderPasswordContainer = () => {
    const {password} = this.state

    return (
      <>
        <label htmlFor="passwordInput" className="credential-label">
          PASSWORD
        </label>
        <input
          className="credentials-input"
          id="passwordInput"
          type="password"
          placeholder="Password"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  render() {
    const {isErrorShown, errorMsg} = this.state

    // console.log(username, password)
    return (
      <div className="login-container">
        <div className="login-card-container">
        <div className='login-logo-container'>
          <img
            alt="website-logo"
            className="login-card-logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
</div>
          <form className="form-container" onSubmit={this.onFormSubmit}>
            <div className="credential-container">
              {this.renderUsernameContainer()}
            </div>
            <div className="credential-container">
              {this.renderPasswordContainer()}
            </div>
            <button className="login-btn" type="submit">
              Login
            </button>
            {isErrorShown ? <p className='error-msg'>{`* ${errorMsg}`}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}
