import { aside } from "../components/aside";
import { header } from "../components/header";
import { setChildren, el } from "redom";
import { mainTable } from "../components/mainTable";
import { player } from "../components/player";
import { IPodcast, ITrack } from "../../services/types";

/**
 * ! fetch /favourite - GET
 */
import { tracksProcess } from "../../services/trackProcess";

export default function favouritePageInit() {
    let tracks: Array<ITrack & IPodcast> = tracksProcess()

    setChildren(window.document.body, [
        header(tracks),
        el('main', [
            el('.container', [
                el('.main-page-wrapper', [
                    aside('favourite'),
                    mainTable(tracks),
                    el('.player__super-wrapper', [
                        player(tracks[0])
                    ])
                ])
            ])
        ])
    ]);
}