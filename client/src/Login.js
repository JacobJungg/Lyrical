
/*
Utilizzing bootstrap for creating of frontend
*/
import React from "react"
import { Container } from "react-bootstrap"


/*
Redirect URL
----------------------------
Utilizes Spotify App Client ID and redirect URI
Scopes needed: 
user-read-email -- for email address
user-read-private -- for private data (required for user information)
user-library-read -- for checking if song is in favorited libary
user-library-modify -- for adding song to favorited libary
user-read-playback-state -- for state of user (playing, paused, etc.)
user-modify-playback-state -- for modifying playback state
*/
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=bc24ac0bb7594b249e24e1b5713318c9&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

/*
Button made with bootstrap
----------------------------
Parameters:
Clicked
Returns:
Redirect to AUTH_URL
*/
export default function Login() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login Through Spotify
      </a>
    </Container>
  )
}