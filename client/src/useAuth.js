import { useState, useEffect } from "react"
import axios from "axios"

//Stores access token, refresh token and expires in
export default function useAuth(code) {
  const [accessToken, setAccessToken] = useState()
  const [expiresIn, setExpiresIn] = useState()
  const [refreshToken, setRefreshToken] = useState()

  //Whenever code changes creates token
  useEffect(() => {
    axios
      .post("http://localhost:3000/login", {
        code,
      })
      .then(res => {

        //Set 
        setAccessToken(res.data.accessToken)
        setExpiresIn(res.data.expiresIn)
        setRefreshToken(res.data.refreshToken)

        //Remove personalized URL (Information following original URL)
        window.history.pushState({}, null, "/")
      })

      //If error redirect to login page
      .catch(() => {



        window.location = "/"
     
     
     
     
      })
  }, [code])


  //When refresh token or expires in changes
  useEffect(() => {
    //If no refresh token or expires in
    if (!refreshToken || !expiresIn) return
    
    //To make sure refresh happens before timer expires
    const interval = setInterval(() => {
      axios
        .post("http://localhost:3001/refresh", {
          refreshToken,
        })
        .then(res => {
          setAccessToken(res.data.accessToken)
          setExpiresIn(res.data.expiresIn)
        })

        //If error redirect to login page
        .catch(() => {
          window.location = "/"
        })
        
    //Miliseconds to refresh token
    }, (expiresIn - 60) * 1000)

    //If error clear timeout
    return () => clearInterval(interval)
  }, [refreshToken, expiresIn])

  
  return accessToken
}