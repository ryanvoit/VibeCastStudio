import { header } from "../components/header";
import { setChildren } from "redom";

export function MainPageInit() {
    setChildren(window.document.body, [header]);
}