import { el } from "redom";
import { svgInit } from "./svg";
import HandleFunctions from "../../controller/HandleFunctionsClass";
import { IPodcast, ITrack } from "../../services/types";

const handleFunctions = new HandleFunctions()

export function searchInput(tracks: Array<ITrack & IPodcast>) {
    const inputSearch = el('.header__search', [
        el('input.input__search', { type: 'text', placeholder: 'Что будем искать?' }),
        svgInit('search')
    ]);
    
    (inputSearch.firstElementChild as HTMLInputElement).addEventListener('input', function() {
        handleFunctions.inputSearch((inputSearch.firstElementChild as HTMLInputElement), tracks)
    })

    return inputSearch
}

export function registAuthInput(name: 'username' | 'password') {
    const label = (name === 'username') ? 'Имя пользователя*:' : 'Пароль*:'
    // const error = (name === 'username') ? ''

    const field = el('input.custom-input__field', {
        type: 'text',
        name: name,
        id: name,
        placeholder: name,
        required: true,
        autocomplete: 'on'
    })

    const input = el('.custom-input', [
        field,
        el('label.custom-input__label', {
            for: name
        }, label)
    ])

    return input

}