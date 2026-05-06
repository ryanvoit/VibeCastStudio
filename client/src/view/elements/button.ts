import { el, setChildren } from "redom";
import { svgInit } from "./svg";
import pic from "./img.svg";
import { navigate } from "./../../services/navigate";
import { IPodcast, ITrack } from "../../services/types";
import HandleFunctionsClass from "../../controller/HandleFunctionsClass";
import { table } from "../components/mainTable";

const HandleFunctions = new HandleFunctionsClass()

export function buttonInit(role: 'favourite' | 'favourite-noCell' | 'settings', tracks: Array<ITrack & IPodcast>, id: number, token: string, favTrax?: ITrack[]) {
    const track = tracks[id]
    switch (role) {
        case 'favourite':
            const isFav = favTrax?.find(tracking => tracking.id === track.id)
            const buttonFav = el('button.button button__favourite', { type: 'button' }, [
                el('td.main-table__cell', [
                    (isFav) ? svgInit('heart-favourite') : svgInit('heart')
                ]),
            ])

            buttonFav.addEventListener('click', function (e) {
                HandleFunctions.buttonFavourite(track, buttonFav, id, token)
            })

            return buttonFav
        case 'favourite-noCell':
            const buttonFavNoCell = el('button.button button__favourite', { type: 'button' }, [
                (track.favourite) ? svgInit('heart-favourite') : svgInit('heart')
            ])

            buttonFavNoCell.addEventListener('click', function (e) {
                HandleFunctions.buttonFavourite(track, (e.target as HTMLElement), id, token)
            })

            return buttonFavNoCell
        case 'settings':
            const buttonSettings = el('button.button button__settings', { type: 'button' }, [
                el('td.main-table__cell', [
                    svgInit('settings')
                ])
            ])

            buttonSettings.addEventListener('click', function (e) {
                HandleFunctions.buttonStartPlay(tracks, id, token)
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

export function buttonPlayInit(tracks: Array<ITrack & IPodcast>, id: number, token: string) {
    const track = tracks[id - 1]
    console.log(track);

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
        HandleFunctions.buttonStartPlay(tracks, id, token)
    })

    return buttonPlay
}

export function btnPlayer(role: 'shuffle' | 'back' | 'playSong' | 'next' | 'repeat', tracks?: Array<ITrack & IPodcast>, id?: number, token?: string) {
    const btn = el(`button.button button__${role}`, { type: 'button' }, [
        svgInit(role)
    ]) as HTMLButtonElement

    switch (role) {
        case 'playSong':
            btn.addEventListener('click', function() {
                HandleFunctions.btnPlay(btn, 
                    // tracks as Array<ITrack & IPodcast>, id as number
                )
            })
            break
        case 'shuffle':
            btn.addEventListener('click', function() {
                HandleFunctions.btnShuffle(tracks as Array<ITrack & IPodcast>, token as string)
            })
            break
        case 'back':
            btn.addEventListener('click', function() {
                HandleFunctions.buttonStartPlay(tracks as Array<ITrack & IPodcast>, (id as number - 1), token as string)
            })
            break
        case 'next':
            btn.addEventListener('click', function() {
                HandleFunctions.buttonStartPlay(tracks as Array<ITrack & IPodcast>, (id as number + 1), token as string)
            })
            break
        case 'repeat':
            btn.addEventListener('click', function() {
                HandleFunctions.buttonStartPlay(tracks as Array<ITrack & IPodcast>, (id as number), token as string)
            })
            break
    }
    return btn
}

export function btnForm(role: 'submit' | 'link', role2: 'regist' | 'auth') {
    let btn
    switch (role) {
        case 'submit':
            const submitText = (role2 === 'auth') ? 'Войти' : 'Зарегестрироваться'
            btn = el(`button.button button__${role}`, { type: 'submit' }, `${submitText}`)

            break
        case 'link':
            const LinkText = (role2 === 'auth') ? 'Авторизация' : 'Регистрация'
            btn = el(`button.button button__${role}`, { type: 'button' }, `${LinkText}`)

            btn.addEventListener('click', function () {
                (document.querySelector('header') as HTMLElement).classList.remove('header--animated')
                const form = ((role2 === 'auth') ? document.querySelector('.register-form') : document.querySelector('.auth-form')) as HTMLFormElement
                form.classList.remove((role2 === 'auth') ? 'register-form--animated' : 'auth-form--animated')
                setTimeout(() => {
                    navigate((role2 === 'auth') ? 'AuthPage' : 'RegisterPage')
                }, 1000)
            })
            break
    }
    return btn
}

export function btnPagination(pageNumber: number, tracks: (ITrack & IPodcast)[], btns: HTMLButtonElement[], token: string, favTrax: ITrack[]) {
    const btn = el(
        'button.button button__pagination', { type: 'button' }, `${pageNumber}`
    )

    btn.addEventListener('click', function() {
        btns.forEach(btn => {
            btn.classList.remove('button__pagination--active')
        })

        btn.classList.add('button__pagination--active')

        setChildren(
            document.querySelector('.main-table__super') as HTMLElement,
            [table(tracks, 5, btns, token, favTrax)]
        )
    })
    return btn
}