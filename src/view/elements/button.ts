import { el } from "redom";
import { svgInit } from "./svg";
import user from './user.svg'
import pic from "./img.svg"
import { navigate } from "../../navigate";

export function buttonInit(role: 'user' | 'sidebar' | 'favourite' |
    'favourite-noCell' | 'settings', active?: boolean, text?: string) {
    switch (role) {
        case 'user':
            const buttonUser = el('button.button button__user', { type: 'button' }, [
                el("img.button__icon", { src: user, height: '42', width: '42' }),
                el("span.button__title", "username"),
                svgInit('arrow')
            ])

            return buttonUser
        case 'sidebar':
            const buttonAside = el('button.button button__aside', { type: 'button' }, [
                svgInit('musicNote'),
                el("span.sidebar__title", `${text}`),
            ])

            if (active && buttonAside) {
                buttonAside.classList.add('button__aside--active')
            }

            return buttonAside
        case 'favourite':
            const buttonFav = el('button.button button__favourite', { type: 'button' }, [
                el('td.main-table__cell', [
                    (active) ? svgInit('heart-favourite') : svgInit('heart')
                ]),
            ])

            return buttonFav
        case 'favourite-noCell':
            const buttonFavNoCell = el('button.button button__favourite', { type: 'button' }, [
                (active) ? svgInit('heart-favourite') : svgInit('heart')
            ])

            return buttonFavNoCell
        case 'settings':
            const buttonSettings = el('button.button button__settings', { type: 'button' }, [
                el('td.main-table__cell', [
                    svgInit('settings')
                ])
            ])

            return buttonSettings
    }
}

export function buttonPlayInit(id: number, title: string, artist?: string, host?: string) {
    const buttonPlay = el('button.button button__play', { type: 'button' }, [
        el('td.main-table__cell', `${id}`),
        el('td.main-table__cell', [
            el('.main-table__wrapper', [
                el('img.main-table__pic', { src: pic, height: 60, width: 60 }),
                el('.main-table__inner', [
                    el('span.main-table__name', `${title}`),
                    el('span.main-table__artist',
                        (artist) ? `${artist}` : `${host}`)
                ])
            ]),
        ]),
        el('td.main-table__cell', '-'),
        el('td.main-table__cell', '-')
    ])

    return buttonPlay
}

export function btnPlayer(role: 'shuffle' | 'back' | 'playSong' | 'next' | 'repeat') {
    const btn = el(`button.button button__${role}`, { type: 'button' }, [
        svgInit(role)
    ])

    return btn
}

