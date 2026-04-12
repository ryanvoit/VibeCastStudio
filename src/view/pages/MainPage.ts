import { aside } from "../components/aside";
import { header } from "../components/header";
import { setChildren, el } from "redom";
import { mainList } from "../components/mainTable";

export function MainPageInit() {
    setChildren(window.document.body, [
        header,
        el('main', [
            el('.container', [
                el('.main-page-wrapper', [
                    aside,
                    mainList
                ])
            ])
        ])
    ]);
}