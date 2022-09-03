import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import AuthContext from '../contexts/UserAuthContext'

const Homepage = () => {
  let [notes,setNotes] = useState([])
  let {authTokens,logOutUser} = useContext(AuthContext)

  useEffect(()=>{
    getNotes()
  },[])

  let getNotes=async()=>{
    let response = await fetch('http://localhost:8000/api/notes/',{
      method:'GET',
      headers:{
        'Content-Type':'application/json',
        'Authorization':'Bearer '+ String(authTokens.access)
      }
    })
    
    if (response.status === 200){
      let data = await response.json()
      setNotes(data)
    }else if (response.statusText === "Unauthorized"){
      logOutUser()
    }
    
  }
  return (
    <div>
        <p>You are logged in to the home page</p>
        <ul>
          {notes.map(note=>{
            return <li key={note.id}>{note.note}</li>
          })}
        </ul>
    </div>
  )
}

export default Homepage