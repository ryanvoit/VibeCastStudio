import { navigate } from "./services/navigate";
import { fetchRegist, fetchTracks, registerUser, loginUser } from "./fetches/fetches";
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

fetchTracks()
