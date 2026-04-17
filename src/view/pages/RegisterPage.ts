import { el, setChildren } from "redom";
import registerFormInit from "../components/registerForm";
import { headerAuth } from "../components/header--auth";

export default function registerPageInit() {
    setChildren(window.document.body, [
        headerAuth(),
        el('main', [
            el('.container', [
                registerFormInit()
            ])
        ])
    ]);
}