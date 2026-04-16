import { aside } from "../components/aside";
import { header } from "../components/header";
import { setChildren, el } from "redom";
import { mainTable } from "../components/mainTable";
import { player } from "../components/player";
import { IPodcast, ITrack } from "../../types";

const track: ITrack & IPodcast = {
    id: 1,
    title: "Eternal Sunset",
    artist: "Skyline Sounds",
    duration: 9.36,
    size_mb: 8.57,
    encoded_audio:
        "QXVkaW8gZGF0YSBmb3IgRXRlcm5hbCBTdW5zZXQgYnkgU2t5bGluZSBTb3VuZHM=",
    favourite: true
}

export default function MainPageInit() {
    setChildren(window.document.body, [
        header,
        el('main', [
            el('.container', [
                el('.main-page-wrapper', [
                    aside,
                    mainTable,
                    player(track)
                ])
            ])
        ])
    ]);
}