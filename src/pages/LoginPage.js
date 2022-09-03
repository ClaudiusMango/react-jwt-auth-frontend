import React from 'react'
import { useContext } from 'react'
import AuthContext from '../contexts/UserAuthContext'

const LoginPage = () => {
  let {logInUser} = useContext(AuthContext)

  return (
    <div>
      <form onSubmit={(e)=>{logInUser(e)}}>
        <input type={"text"} name = "username" placeholder='Enter username'/>
        <input type="password" name = "password" placeholder='Enter password'/>
        <input type= "submit" />
      </form>
    </div>
  )
}

export default LoginPage