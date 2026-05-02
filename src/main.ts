import { navigate } from "./services/navigate";
import "./styles/main.scss";
import requestClass from "./model/requestClass.ts";
import "./sprite.svg";

const requests = new requestClass()

// navigate('RegisterPage')
navigate('RegisterPage')
requests.fetchTracks()


