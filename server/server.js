require("dotenv").config()
const express = require('express');
const cors = require("cors")
const bodyParser = require("body-parser")
const lyricsFinder = require("lyrics-finder")
const SpotifyWebApi = require("spotify-web-api-node")


//Fix CORS being blocked (CORS policy)
const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//
app.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
    redirectURI: 'http://localhost:3000',
    clientId: 'bc24ac0bb7594b249e24e1b5713318c9',
    clientSecret: '261784f781b6417e9f18fb86d5573a97',
    refreshToken,
})

  spotifyApi
    .refreshAccessToken()
    .then(data => {
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
    })

    //Catch errors
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

app.post('/login', (req, res) => {
    const code =req.body.code

    //Creating new spotify class
    const spotifiy = new SpotifyWebApi({
        redirectURI: 'http://localhost:3000',
        clientId: 'bc24ac0bb7594b249e24e1b5713318c9',
        clientSecret: '261784f781b6417e9f18fb86d5573a97'
    })

    //Authorizie code
    spotifyWebApi.authorizationCodeGrant(code).then(data => {
        //Retrive an access token and refresh token
        res.json({
            accessToken: data.body.access_token,
            expresIn:data.body.expres_in,
            refreshToken: data.body.refresh_token,
        })

    })
    //Catch errors
    .catach(() => {
        res.sendStatus(400)
    })
})

app.listen(3001)