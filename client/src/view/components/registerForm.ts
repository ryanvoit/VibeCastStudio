import { el } from "redom";
import { registAuthInput } from "../elements/input";
import { btnForm } from "../elements/button";
import { validate } from "../../services/validateRegister";

export default function registerFormInit() {
    const btnSubmit = btnForm('submit', 'regist')
    const inputUsername: HTMLElement = registAuthInput('username')
    const inputPassword: HTMLElement = registAuthInput('password')

    const registerForm = el('form.register-form', {
        action: 'http://localhost:8000/api/register',
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

    setTimeout(() => {
        validate()
    }, 10)

    return registerForm
}