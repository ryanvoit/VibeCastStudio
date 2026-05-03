import JustValidate from 'just-validate';
import requestClass from '../model/requestClass.ts.ts';

export function validate() {
    const form = document.querySelector('form')
    const inputUsername = document.querySelector('#username')
    const inputPassword = document.querySelector('#password')

    const validator = new JustValidate(form)
    const requests = new requestClass()

    validator
        .addField(inputUsername, [
            {
                rule: 'required',
                errorMessage: "Имя пользователя - обязательное поле"
            },
            {
                rule: 'minLength',
                value: 6,
                errorMessage: "Слишком мало символов, необходимо как минимум 6"
            },
            {
                rule: 'maxLength',
                value: 25,
                errorMessage: "Слишком много символов, уменьшите количество символов до 25"
            }
        ])
        .addField(inputPassword, [
            {
                rule: 'required',
                errorMessage: "Пароль - обязательное поле"
            },
            {
                rule: 'maxLength',
                value: 25,
                errorMessage: "Слишком много символов, уменьшите количество символов до 25"
            },
            {
                rule: 'strongPassword',
                errorMessage: 'Пароль должен состоять минимум из 8 символов, среди которых один - Большой буквы, один - маленькой буквы, один - числом, один - особый символ'
            }
        ])
        .onSuccess(function(e) {
            requests.registerUser({
                username: inputUsername.value,
                password: inputPassword.value
            })
        })
}
