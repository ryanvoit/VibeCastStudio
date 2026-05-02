import { fetchUser } from "../services/types"
import { navigate } from "../services/navigate"

export default class requestClass {
    async registerUser(newUser: fetchUser) {
        await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        }).then((response) => response.json())
        .then((data) => {
            if(data.message !== "пользователь уже существует") {
                navigate('AuthPage')
                console.log(data);
            } else {
                console.log(data);
            }
        })
    }
    /**
     * ! try { fetch --> !response.ok } 
     * ! try { 
     * ! fetch --> response.ok --> navigate('AuthPage');
     * ! localStorage(response) ---> value 'AuthPage'
     * ! }
     * ! catch(error) { error.message } 
     * ! message can be 'пользователь уже существует'
     */

    async loginUser(user: fetchUser) {
        return fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((response) => response.json())
            .then((data) => {
            if(data.message !== "произошла ошибка при авторизации - неверные данные") {
                navigate('MainPage')
                console.log(data);
            } else {
                console.log(data);
            }
        })
    }
    /**
     * ! try { fetch --> !response.ok } 
     * ! try { fetch --> response.ok --> navigate('MainPage')
     * ! + username!!!
     * ! }
     * ! catch(error) { error.message } 
     * ! message can be 'произошла ошибка при авторизации — неверные данные'
     */

    async fetchTracks() {
        const response = await fetch('http://localhost:8000/api/tracks')
        const data = await response.json()
        console.log(data);
    }

    async fetchFavouriteTracks() {
        const response = await fetch('http://localhost:8000/api/favourites')
        const data = await response.json()
        console.log(data);
    }
}