import { el } from "redom";
import { svgInit } from "./svg";
import user from './user.svg'

export function buttonInit(role: 'user' | 'something') {
    switch(role) {
        case 'user':
            const button = el('button.button__search', {type: 'button'}, [
                el("img.button__icon", {src: user, height: '42', width: '42'} ),
		        el("span.button__title", "username"),
                svgInit('arrow')
            ])

            return button
    }
}