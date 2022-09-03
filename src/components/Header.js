import {React,useContext } from 'react'
import {Link} from 'react-router-dom';
import AuthContext from '../contexts/UserAuthContext';
const Header = () => {
  let {user,logOutUser} = useContext(AuthContext)
  return (
    <div>
        <Link to={"/"}>Home</Link>
        <span> | </span>
        {user? <p onClick={()=>{logOutUser()}}>Log out</p>:<Link to={"/login"}>Login</Link>}
        {user && <p>hello {user.username}</p>}
    </div>
  )
}

export default Header