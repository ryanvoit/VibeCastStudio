import { aside } from "../components/aside";
import { header } from "../components/header";
import { setChildren, el } from "redom";
import { mainTable } from "../components/mainTable";
import { player } from "../components/player";

export function MainPageInit() {
    setChildren(window.document.body, [
        header,
        el('main', [
            el('.container', [
                el('.main-page-wrapper', [
                    aside,
                    mainTable,
                    player
                ])
            ])
        ])
    ]);
}