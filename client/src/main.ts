import { navigate } from "./services/navigate";
import "./styles/main.scss";
import "./sprite.svg";
import localStorageWork from "./model/localStorageClass";
import requestClass from "./model/requestClass";

const lS = new localStorageWork()
const request = new requestClass()

const user = lS.loadUser() 
if (user) {
    request.loginUser(user, true)
}

navigate('AuthPage', null)


