import { el } from "redom";
import { svgInit } from "./svg";

export function inputInit(role: 'search' | 'something') {
    switch(role) {
        case 'search':
            const input = el('.header__search', [
                el('input.input__search', {type: 'text' , placeholder: 'Что будем искать?'}),
                svgInit('search')
            ])

            return input
    }
}