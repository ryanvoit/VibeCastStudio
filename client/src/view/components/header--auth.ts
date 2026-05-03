import { el } from "redom"
import { svgInit } from "../elements/svg"

export function headerAuth() {
    const header = el('header.header header--auth', [
        el('.container', [
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