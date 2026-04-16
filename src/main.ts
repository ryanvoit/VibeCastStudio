import { navigate } from "./navigate";
import { fetchRegist, fetchTracks } from "./fetches/fetches";

navigate('MainPage')

const newUser = {
    username: 'ryanvoit',
    password: 'ryanvoit'
}

fetchRegist(newUser)
fetchTracks()