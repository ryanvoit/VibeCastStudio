import { navigate } from "./navigate";
import { fetchRegist, fetchTracks } from "./fetches/fetches";
import "./styles/main.scss"
import "./sprite.svg"

navigate('AuthPage')

fetchRegist({
    username: 'ryanvoit',
    password: 'ryanvoit'
})

fetchTracks()