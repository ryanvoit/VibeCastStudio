import { el, setChildren } from "redom";
import { svgInit } from "./svg";
import pic from "./img.svg";
import { navigate } from "./../../services/navigate";
import { ITrack } from "../../services/types";
import HandleFunctionsClass from "../../controller/HandleFunctionsClass";
import { table } from "../components/mainTable";
import requestClass from "../../model/requestClass";
import buttonAsideClick from "../../controller/buttonAsideClick";

const HandleFunctions = new HandleFunctionsClass()
const request = new requestClass()

export function buttonInit(role: 'favourite' | 'settings', tracks: Array<ITrack>, id: number, token: string, favTrax?: ITrack[]) {
    const track = tracks.find(track2 => id === track2.id) as ITrack

    const isFav = favTrax?.find(tracking => tracking.id === id)
    switch (role) {
        case 'favourite':
            const buttonCell = el('button.button button--favourite', { type: 'button' }, [
                (isFav) ? svgInit('heart-favourite') : svgInit('heart')
            ])

            buttonCell.addEventListener('click', function (e) {
                HandleFunctions.buttonFavourite(track, buttonCell, id, token, role)
            })

            return buttonCell
        case 'settings':
            const buttonSettings = el('button.button button--settings', { type: 'button' }, [
                svgInit('settings')
            ])

            buttonSettings.addEventListener('click', function (e) {
                HandleFunctions.buttonStartPlay(tracks, id, token)
            })

            return buttonSettings
    }
}

export function asideBtn(active: boolean, text: string, token: string, trax: ITrack[]) {
    const buttonAside = el('button.button button--aside', { type: 'button' }, [
        svgInit('musicNote'),
        active ? svgInit('playActive') : svgInit('playActiveOff'),
        el("span.sidebar__title", `${text}`),
    ])
    const navigation = text === 'Избранное' ? 'FavouritePage' : 'MainPage'

    if (active && buttonAside) {
        buttonAside.classList.add('button--aside--active')
    } else {
        buttonAside.addEventListener('click', function () {
            buttonAsideClick(navigation, token, trax)
        })
    }

    return buttonAside
}

export function buttonPlayInit(tracks: Array<ITrack>, id: number, token: string) {
    const track = tracks.find(track => id === track.id) as ITrack

    const buttonPlay = el('button.button button--play', { type: 'button' }, [
        el('td.main-table__cell', `${track.id}`),
        el('td.main-table__cell', [
            el('.main-table__wrapper', [
                el('img.main-table__pic', { src: pic, height: 60, width: 60, alt: 'Обложка альбома' }),
                el('.main-table__inner', [
                    el('span.main-table__name', `${track.title}`),
                    el('span.main-table__artist', `${track.artist}`)
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

export function btnPlayInit(role: 'id' | 'name' | 'other', tracks: Array<ITrack>, id: number, token: string) {
    const track = tracks.find(track => id === track.id) as ITrack
    let btn

    switch (role) {
        case 'id':
            btn = el('button.button button--play', { type: 'button' }, `${track.id}`)
            break
        case 'name':
            btn = el('button.button button--play', { type: 'button' }, [
                el('.main-table__wrapper', [
                    el('img.main-table__pic', { src: pic, height: 60, width: 60, alt: 'Обложка альбома' }),
                    el('.main-table__inner', [
                        el('span.main-table__name', `${track.title}`),
                        el('span.main-table__artist', `${track.artist}`)
                    ])
                ]),
            ])
            break
        case 'other':
            btn = el('button.button button--play', { type: 'button' }, '-')
            break
    }

    btn.addEventListener('click', function () {
        HandleFunctions.buttonStartPlay(tracks, id, token)
    })

    return btn
}

export function btnPlayer(role: 'shuffle' | 'back' | 'playSong' | 'next' | 'repeat', tracks?: Array<ITrack>, id?: number, token?: string, index?: number) {
    const btn = el(`button.button button--${role}`, { type: 'button' }, [
        svgInit(role)
    ]) as HTMLButtonElement

    switch (role) {
        case 'playSong':
            btn.addEventListener('click', function () {
                HandleFunctions.btnPlay(btn)
            })
            break
        case 'shuffle':
            btn.addEventListener('click', function () {
                HandleFunctions.btnShuffle(tracks as Array<ITrack>, token as string)
            })
            break
        case 'back':
            const maxB = (tracks as Array<ITrack>).length
            index = index === 0 ? maxB : index
            const backId = (tracks as Array<ITrack>)[(index as number) - 1].id
            btn.addEventListener('click', function () {
                HandleFunctions.buttonStartPlay(tracks as Array<ITrack>, backId, token as string)
            })
            break
        case 'next':
            const maxN = (tracks as Array<ITrack>).length
            index = index === maxN - 1 ? -1 : index
            const nextId = (tracks as Array<ITrack>)[(index as number) + 1].id
            btn.addEventListener('click', function () {
                HandleFunctions.buttonStartPlay(tracks as Array<ITrack>, nextId, token as string)
            })
            break
        case 'repeat':
            btn.addEventListener('click', function () {
                HandleFunctions.buttonStartPlay(tracks as Array<ITrack>, (id as number), token as string)
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
            btn = el(`button.button button--${role}`, { type: 'submit' }, `${submitText}`)

            break
        case 'link':
            const LinkText = (role2 === 'auth') ? 'Авторизация' : 'Регистрация'
            btn = el(`button.button button--${role}`, { type: 'button' }, `${LinkText}`)

            btn.addEventListener('click', function () {
                (document.querySelector('header') as HTMLElement).classList.remove('header--animated')
                const form = ((role2 === 'auth') ? document.querySelector('.register-form') : document.querySelector('.auth-form')) as HTMLFormElement
                form.classList.remove((role2 === 'auth') ? 'register-form--animated' : 'auth-form--animated')
                setTimeout(() => {
                    navigate((role2 === 'auth') ? 'AuthPage' : 'RegisterPage', null)
                }, 1000)
            })
            break
    }
    return btn
}

export function btnPagination(pageNumber: number, tracks: ITrack[], btns: HTMLButtonElement[], token: string, tracksAmountPage: number) {
    const btn = el(
        'button.button button--pagination', { type: 'button' }, `${pageNumber}`
    )

    btn.addEventListener('click', function () {
        btns.forEach(btn => {
            btn.classList.remove('button--pagination-active')
        })

        btn.classList.add('button--pagination-active')

        const favTr = request.fetchFavouriteTracks(token)
        favTr.then((FT) => {
            setChildren(
                document.querySelector('.main-table__super') as HTMLElement, [table(tracks, tracksAmountPage, btns, token, FT)]
            )
        })
    })
    return btn
}