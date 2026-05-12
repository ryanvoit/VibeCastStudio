import { el } from "redom"
import { svgInit } from "../elements/svg"

export function headerAuth(role: 'auth' | 'register') {
    const header = el('header.header header--auth', [
        el('.container', [
            el('h1.header__title visually-hidden', role === 'auth' ? 'Авторизация' : 'Регистрация'),
            el('.header__wrapper', [
                el(".header__logo", [
                    svgInit('logo'),
                    el("span.header__title", "VibeCast Studio")
                ])
            ])
        ])
    ])

    setTimeout(() => {
        header.classList.add('header--animated')
    }, 10)

    return header
}