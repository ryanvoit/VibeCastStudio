import { el } from "redom";
import { svgInit } from "./svg";

export function inputInit(role: 'search' | 'reg-auth', name?: 'username' | 'password') {
    switch(role) {
        case 'search':
            const inputSearch = el('.header__search', [
                el('input.input__search', {type: 'text' , placeholder: 'Что будем искать?'}),
                svgInit('search')
            ])

            return inputSearch
        case 'reg-auth':
            const label = (name === 'username') ? 'Имя пользователя*:' : 'Пароль*:'

            const input = el('.custom-input', [
                el('input.custom-input__field', {
                    type: 'text',
                    name: name,
                    id: name,
                    placeholder: name,
                    required: true,
                    autocomplete: 'on'
                }),
                el('label.custom-input__label', {
                    for: name
                }, label)
            ])

            return input
    }
}