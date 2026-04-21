import { fetchUser } from "../services/types"

export default class requestClass {
    registerUser(newUser: fetchUser) {
        return fetch('http://localhost:8000/api/register', {
            // http://localhost:8000/api/register
            // /api/register
            // http://127.0.0.1:5500/api/register
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        }).then((response) => response.json())
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

    loginUser(user: fetchUser) {
        return fetch('http://localhost:8000/api/login', {
            // http://localhost:8000/api/login
            // /api/login
            // http://127.0.0.1:5500/api/login
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((response) => response.json())
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
        // http://localhost:8000/api/tracks
        // /api/tracks
        // http://127.0.0.1:5500/api/tracks

        const data = await response.json()
        console.log(data);
    }

    async fetchFavouriteTracks() {
        const response = await fetch('http://localhost:8000/api/favourites') 
        // http://localhost:8000/api/favourites
        // /api/favourites
        // http://127.0.0.1:5500/api/favourites

        const data = await response.json()
        console.log(data);
    }
}