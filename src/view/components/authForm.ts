import { el } from "redom";
import { inputInit } from "../elements/input";
import { btnForm } from "../elements/button";

export default function authFormInit() {
    const authForm = el('form.auth-form', {
        action: '#',
        method: 'POST'
    }, [ 
        inputInit('reg-auth', 'username'),
        inputInit('reg-auth', 'password'),
        btnForm('submit', 'auth'),
        el('.auth-form__link', [
            el('span.auth-form__text', 'Ещё нет аккаунта?:'),
            btnForm('link', 'regist')
        ])
    ])

    return authForm
}