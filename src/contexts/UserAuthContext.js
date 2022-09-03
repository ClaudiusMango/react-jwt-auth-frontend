import { createContext,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import jwtDecode from "jwt-decode";
const AuthContext = createContext()

export default AuthContext;


export const AuthProvider = ({children}) => {

    let[authTokens,setauthTokens] = useState(()=>localStorage.getItem("authTockens")? JSON.parse(localStorage.getItem("authTockens")):null)
    let[user,setUser] = useState(()=>localStorage.getItem("authTockens")? jwtDecode(JSON.parse(localStorage.getItem("authTockens")).access):null)
    let navigate = useNavigate()
    let [loading,setLoading] = useState(true)

    let logInUser= async(e)=>{
        e.preventDefault()
        let response = await fetch('http://localhost:8000/api/token/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'origin':'*',
            },
            body:JSON.stringify({
                'username':e.target.username.value,
                'password':e.target.password.value
            })
        })
        let data = await response.json()
        if(response.status === 200){
            setauthTokens(data)
            let user = jwtDecode(data.access)
            setUser(user)
            localStorage.setItem('authTockens',JSON.stringify(data))
            navigate("/")
        }else{
            if (data.detail){
                alert(data.detail)
            }else{
                alert("Sorry could not authenticate user")
            }
        }
    }

    let logOutUser = () =>{
        setauthTokens(null)
        setUser(null)
        localStorage.removeItem('authTockens')
        navigate("/login")
    }

    let updateTocken = async () =>{
        let response = await fetch('http://localhost:8000/api/token/refresh/',{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                'origin':'*',
            },
            body:JSON.stringify({
                'refresh':authTokens?.refresh,
            })
        })
        let data = await response.json()
        if(response.status === 200){
            setauthTokens(data)
            let user = jwtDecode(data.access)
            setUser(user)
            localStorage.setItem('authTockens',JSON.stringify(data))
        }else{
            logOutUser()
        }
        if(loading){
            setLoading(false)
        }
    }

    useEffect(()=>{
        if (loading){
            updateTocken()
        }
        let interval = setInterval(()=>{
            if(authTokens){
                updateTocken()
            }
        },(10*60*1000))
        return ()=>clearInterval(interval)
    },[authTokens,loading])

    let contextData = {
        'logInUser':logInUser,
        'logOutUser':logOutUser,
        'authTokens':authTokens,
        'user':user
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading? null: children}
        </AuthContext.Provider>
    )
}