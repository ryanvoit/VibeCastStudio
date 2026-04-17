import { el } from "redom";
import { inputInit } from "../elements/input";
import { btnForm } from "../elements/button";

export default function registerFormInit() {
    const registerForm = el('form.register-form', { 
        action: '#', 
        method: 'POST' 
    }, [
        inputInit('reg-auth', 'username'),
        inputInit('reg-auth', 'password'),
        btnForm('submit', 'regist'),
        el('.register-form__link', [
            el('span.register-form__text', 'Уже есть аккаунт?:'),
            btnForm('link', 'auth')
        ])
    ])

    return registerForm
}