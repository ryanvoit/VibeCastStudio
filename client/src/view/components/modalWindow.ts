import { el } from "redom";
import { svgInit } from "../elements/svg";

export function modalWindow() {
    const modalWindow = el('.modal-window', [
        svgInit('tick'),
        el('.modal-window__message', 'ffffffffffffff')
    ])

    return modalWindow
}