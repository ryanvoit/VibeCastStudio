import { el } from "redom";
import { svgInit } from "./svg";
import user from './user.svg'

export function buttonInit(role: 'user' | 'sidebar', text?: string, active?: boolean) {
    switch(role) {
        case 'user':
            const buttonUser = el('button.button__search', {type: 'button'}, [
                el("img.button__icon", {src: user, height: '42', width: '42'} ),
		        el("span.button__title", "username"),
                svgInit('arrow')
            ])

            return buttonUser
        case 'sidebar':
            const buttonAside = el('button.button__aside', {type: 'button'}, [
                svgInit('musicNote'),
		        el("span.button__title", `${text}`),
            ])

            if(active && buttonAside) {
                buttonAside.classList.add('button__aside--active')
            }

            return buttonAside
    }
}