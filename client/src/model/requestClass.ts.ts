import { fetchUser } from "../services/types"
import { navigate } from "../services/navigate"

export default class requestClass {
    form = document.querySelector('form') as HTMLFormElement
    header = document.querySelector('.header') as HTMLElement

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
                this.form.classList.remove('register-form--animated')
                console.log(data);
                setTimeout(() => {
                    navigate('AuthPage')
                }, 1000)
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
                this.form.classList.remove('auth-form--animated')
                this.header.classList.remove('header--animated')
                console.log(data);
                setTimeout(() => {
                    navigate('MainPage')
                }, 1000)
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
        return data
    }

    async fetchFavouriteTracks() {
        const response = await fetch('http://localhost:8000/api/favourites')
        const data = await response.json()
        console.log(data);
    }
}