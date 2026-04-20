import { el, setChildren } from "redom";
import { svgInit } from "./svg";
import pic from "./img.svg";
import { navigate } from "./../../services/navigate";
import { IPodcast, ITrack } from "../../services/types";
import HandleFunctionsClass from "../../controller/HandleFunctionsClass";

const HandleFunctions = new HandleFunctionsClass()

export function buttonInit(role: 'favourite' | 'favourite-noCell' | 'settings', track: ITrack & IPodcast) {
    switch (role) {
        case 'favourite':
            const buttonFav = el('button.button button__favourite', { type: 'button' }, [
                el('td.main-table__cell', [
                    (track.favourite) ? svgInit('heart-favourite') : svgInit('heart')
                ]),
            ])

            buttonFav.addEventListener('click', function (e) {
                HandleFunctions.buttonFavourite(track, (e.target as HTMLElement))
            })

            return buttonFav
        case 'favourite-noCell':
            const buttonFavNoCell = el('button.button button__favourite', { type: 'button' }, [
                (track.favourite) ? svgInit('heart-favourite') : svgInit('heart')
            ])

            buttonFavNoCell.addEventListener('click', function (e) {
                HandleFunctions.buttonFavourite(track, (e.target as HTMLElement))
            })

            return buttonFavNoCell
        case 'settings':
            const buttonSettings = el('button.button button__settings', { type: 'button' }, [
                el('td.main-table__cell', [
                    svgInit('settings')
                ])
            ])

            buttonSettings.addEventListener('click', function(e){
                HandleFunctions.buttonStartPlay(track)
            })

            return buttonSettings
    }
}

export function asideBtn(active: boolean, text: string) {
    const buttonAside = el('button.button button__aside', { type: 'button' }, [
        svgInit('musicNote'),
        el("span.sidebar__title", `${text}`),
    ])
    const navigation = text === 'Избранное' ? 'FavouritePage' : 'MainPage'

    if (active && buttonAside) {
        buttonAside.classList.add('button__aside--active')
    } else {
        buttonAside.addEventListener('click', function () {
            HandleFunctions.buttonAside(navigation)
        })
    }

    return buttonAside
}

export function buttonPlayInit(track: ITrack & IPodcast) {
    const buttonPlay = el('button.button button__play', { type: 'button' }, [
        el('td.main-table__cell', `${track.id}`),
        el('td.main-table__cell', [
            el('.main-table__wrapper', [
                el('img.main-table__pic', { src: pic, height: 60, width: 60 }),
                el('.main-table__inner', [
                    el('span.main-table__name', `${track.title}`),
                    el('span.main-table__artist',
                        (track.artist) ? `${track.artist}` : `${track.host}`)
                ])
            ]),
        ]),
        el('td.main-table__cell', '-'),
        el('td.main-table__cell', '-')
    ])

    buttonPlay.addEventListener('click', function () {
        HandleFunctions.buttonStartPlay(track)
    })

    return buttonPlay
}

export function btnPlayer(role: 'shuffle' | 'back' | 'playSong' | 'next' | 'repeat') {
    const btn = el(`button.button button__${role}`, { type: 'button' }, [
        svgInit(role)
    ])

    return btn
}

export function btnForm(role: 'submit' | 'link', role2: 'regist' | 'auth') {
    let btn
    switch (role) {
        case 'submit':
            const submitText = (role2 === 'auth') ? 'Войти' : 'Зарегестрироваться'
            btn = el(`button.button button__${role}`, { type: 'submit' }, `${submitText}`)

            btn.addEventListener('click', function(e){
                console.log('fff');
                /**
                 * !----------------------------------
                 * !---------------------------
                 * !----------------------
                 */
            })
            break
        case 'link':
            const LinkText = (role2 === 'auth') ? 'Авторизация' : 'Регистрация'
            btn = el(`button.button button__${role}`, { type: 'button' }, `${LinkText}`)

            btn.addEventListener('click', function () {
                navigate((role2 === 'auth') ? 'AuthPage' : 'RegisterPage')
            })
            break
    }
    return btn
}