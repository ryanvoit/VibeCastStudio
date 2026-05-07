import { el, setChildren } from "redom";
import registerFormInit from "../components/registerForm";
import authFormInit from "../components/authForm";
import { headerAuth } from "../components/header--auth";
import { modalWindow } from "../components/modalWindow";

export default function formPageInit(role: 'auth' | 'register', message: "произошла ошибка при авторизации - неверные данные" | "пользователь уже существует" |
    "авторизация прошла успешно" | "пользователь успешно добавлен" | null) {
    setChildren(window.document.body, [
        headerAuth(),
        el('main', [
            el('.container', [
                (role === 'auth') ? authFormInit(): registerFormInit(),
            ])
        ]),
        modalWindow(message, true)
    ]);
}