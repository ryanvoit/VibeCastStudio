import { navigate } from "./services/navigate";
import { fetchRegist, fetchTracks, registerUser, loginUser, fetchFavouriteTracks } from "./model/requestsClass.ts";
import "./styles/main.scss"
import "./sprite.svg"

navigate('AuthPage')

console.log(
    registerUser(
        'ryanvoit', 'ryanvoit'
    )
);
loginUser(
    'ryanvoit', 'ryanvoit'
)

fetchFavouriteTracks()
fetchTracks()
