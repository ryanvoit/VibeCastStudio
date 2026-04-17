import JustValidate from 'just-validate';

export function validate(e: Event, form: HTMLFormElement, formRole: 'register' | 'auth') {
    e.preventDefault()

    const validator = new JustValidate(form)

    const inputUsername = (form.firstElementChild as HTMLElement).firstElementChild as HTMLInputElement;
    const inputPassword = ((form.firstElementChild as HTMLElement).nextElementSibling as HTMLElement).firstElementChild as HTMLInputElement;

    switch (formRole) {
        case 'register':

        /**
         * ! try { fetch --> !response.ok } 
         * ! catch(error) { error.message } 
         * ! message can be 'пользователь уже существует'
         */

        /*
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
        */

        /*
        validator.onSuccess(function() {
            // fetchLogin()
        })
            */

        case 'auth':
            /**
         * ! try { fetch --> !response.ok } 
         * ! catch(error) { error.message } 
         * ! message can be 'произошла ошибка при авторизации — неверные данные'
         */
/*
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
        */

        /*
    
        validator.onSuccess(function() {
            // fetchLogin()
        })
            */
    }
}