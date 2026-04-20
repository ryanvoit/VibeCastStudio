import JustValidate from 'just-validate';
import requestClass from '../model/requestClass.ts.ts';
import { navigate } from './navigate.ts'

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
        ])
        .addField(inputPassword, [
            {
                rule: 'required',
                errorMessage: "Пароль - обязательное поле"
            }
        ])
        .onSuccess(function (e) {
            requests.loginUser()
            navigate('MainPage')
            /**
             * ! try { fetch --> !response.ok } 
             * ! try { fetch --> response.ok --> navigate('MainPage')}
             * ! catch(error) { error.message } 
             * ! message can be 'произошла ошибка при авторизации — неверные данные'
             */
        })
}