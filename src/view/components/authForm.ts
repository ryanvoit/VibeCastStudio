import { el } from "redom";
import { inputInit } from "../elements/input";
import { btnForm } from "../elements/button";
import { validate } from "../../services/validate";

export default function authFormInit() {
    const btnSubmit = btnForm('submit', 'auth')
    const inputUsername: HTMLElement = inputInit('reg-auth', 'username')
    const inputPassword: HTMLElement = inputInit('reg-auth', 'password')

    const authForm = el('form.auth-form', {
        action: '#',
        method: 'POST'
    }, [ 
        inputUsername,
        inputPassword,
        btnSubmit,
        el('.auth-form__link', [
            el('span.auth-form__text', 'Ещё нет аккаунта?:'),
            btnForm('link', 'regist')
        ])
    ]) as HTMLFormElement

    btnSubmit.addEventListener('click', function(e) {
        validate(e, authForm, 'auth')
    })

    return authForm
}