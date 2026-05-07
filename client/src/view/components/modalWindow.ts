import { el } from "redom";
import { svgInit } from "../elements/svg";

export function modalWindow(message: "произошла ошибка при авторизации - неверные данные" | "пользователь уже существует" |
    "авторизация прошла успешно" | "пользователь успешно добавлен" | null, fade?: boolean): HTMLElement {
    let modalWindow
    switch (message) {
        case null:
            modalWindow = el('.modal-window modal-window--none')
            break
        case "пользователь успешно добавлен":
        case "авторизация прошла успешно":
            modalWindow = el('.modal-window modal-window--success', [
                svgInit('tick'),
                el('.modal-window__message', message)
            ])
            if (fade) {
                modalWindow.classList.add('modal-window--success-fade')
            }
            break
        case "произошла ошибка при авторизации - неверные данные":
        case "пользователь уже существует":
            modalWindow = el('.modal-window modal-window--fail', [
                svgInit('cross'),
                el('.modal-window__message', message)
            ])
            break
    }

    return modalWindow
}