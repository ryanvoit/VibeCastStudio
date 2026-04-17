import { navigate } from "./navigate";
import { fetchRegist, fetchTracks } from "./fetches/fetches";
import "./styles/main.scss"
import "./sprite.svg"

navigate('MainPage')

const newUser = {
    username: 'ryanvoit',
    password: 'ryanvoit'
}

fetchRegist(newUser)
fetchTracks()