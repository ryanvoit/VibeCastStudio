import { el } from "redom";
import { inputInit } from "../elements/input";
import { btnForm } from "../elements/button";
import { validate } from "../../services/validate";

export default function registerFormInit() {
    const btnSubmit = btnForm('submit', 'regist')
    const inputUsername: HTMLElement = inputInit('reg-auth', 'username')
    const inputPassword: HTMLElement = inputInit('reg-auth', 'password')

    const registerForm = el('form.register-form', {
        action: '#',
        method: 'POST'
    }, [
        inputUsername,
        inputPassword,
        btnSubmit,
        el('.register-form__link', [
            el('span.register-form__text', 'Уже есть аккаунт?:'),
            btnForm('link', 'auth')
        ])
    ]) as HTMLFormElement

    btnSubmit.addEventListener('click', function (e) {
        validate(e, registerForm, 'register')
    })

    return registerForm
}