import { navigate } from "./services/navigate";
import "./styles/main.scss";
import "./sprite.svg";
import localStorageWork from "./model/localStorageClass";
import requestClass from "./model/requestClass";

const lS = new localStorageWork()
const request = new requestClass()

async function firstPage() {
    const user = lS.loadUser()
    if (user) {
        await request.loginUser(user, true)
    } 
    navigate('AuthPage', null)

}

firstPage()




