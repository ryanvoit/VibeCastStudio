import { fetchUser, idTrack } from "../services/types"
import { navigate } from "../services/navigate"
import { setChildren } from "redom"
import { modalWindow } from "../view/components/modalWindow"

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
                if (data.message !== "пользователь уже существует") {
                    if (document.querySelector('.modal-window--fail')) {
                        const fail = document.querySelector('.modal-window--fail') as HTMLElement
                        fail.classList.remove('modal-window--fail')
                        fail.classList.add('modal-window--none')
                    }
                    document.body.append(modalWindow(data.message, false))
                    // modalWindow(data.message)
                    this.form.classList.remove('register-form--animated')
                    this.header.classList.remove('header--animated')
                    setTimeout(() => {
                        navigate('AuthPage', data.message)
                    }, 1000)
                } else {
                    if (!document.querySelector('.modal-window--fail')) {
                        document.body.append(modalWindow(data.message))
                    }
                    // setChildren(window.document.body, [modalWindow(data.message)])
                }
            })
    }

    async loginUser(user: fetchUser) {
        return fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        }).then((response) => response.json())
            .then((data) => {
                if (data.message !== "произошла ошибка при авторизации - неверные данные") {
                    if (document.querySelector('.modal-window--fail')) {
                        const fail = document.querySelector('.modal-window--fail') as HTMLElement
                        fail.classList.remove('modal-window--fail')
                        fail.classList.add('modal-window--none')
                    } else if (document.querySelector('.modal-window--success')) {
                        const success = document.querySelector('.modal-window--success') as HTMLElement
                        success.classList.remove('modal-window--success')
                        success.classList.add('modal-window--none')
                    }
                    document.body.append(modalWindow(data.message, false))
                    // modalWindow(data.message)
                    this.form.classList.remove('auth-form--animated')
                    this.header.classList.remove('header--animated')
                    setTimeout(() => {
                        navigate('MainPage', data.message, user.username, data.token)
                    }, 1000)
                } else {
                    // setChildren(window.document.body, [modalWindow(data.message)])
                    if (document.querySelector('.modal-window--fail')) {
                        const fail = document.querySelector('.modal-window--fail') as HTMLElement
                        fail.classList.remove('modal-window--fail')
                        fail.classList.add('modal-window--none')
                    } else if (document.querySelector('.modal-window--success')) {
                        const success = document.querySelector('.modal-window--success') as HTMLElement
                        success.classList.remove('modal-window--success')
                        success.classList.add('modal-window--none')
                    }
                    document.body.append(modalWindow(data.message))
                }
            })
    }

    async fetchTracks(token: string) {
        return await fetch('http://localhost:8000/api/tracks', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }
        ).then((response) => response.json())
    }

    async fetchFavouriteTracks(token: string) {
        return await fetch('http://localhost:8000/api/favorites', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }
        ).then((response) => response.json())
    }

    async AddFavourite(id: idTrack, token: string) {
        return fetch('http://localhost:8000/api/favorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(id)
        }).then((response) => response.json())
    }

    async removeFavourite(id: idTrack, token: string) {
        return fetch('http://localhost:8000/api/favorites', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(id)
        }).then((response) => response.json())
    }
}