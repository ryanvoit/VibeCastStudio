import { aside } from "../components/aside";
import { header } from "../components/header";
import { setChildren, el } from "redom";
import { mainTable } from "../components/mainTable";
import { player } from "../components/player";
import { IPodcast, ITrack } from "../../services/types";
import { tracksProcess } from "../../services/trackProcess";

import { tracks } from './tracks';
import { podcasts } from "./podcasts"

export default function mainPageInit() {
    /**
     * ! fetch /tracks - GET
     */
    let trax: Array<ITrack & IPodcast> = tracksProcess(tracks, podcasts)

    setChildren(window.document.body, [
        header(trax),
        el('main', [
            el('.container', [
                el('.main-page-wrapper', [
                    aside('main'),
                    mainTable(trax),
                    /**
                     * !
                     * ! PAGGINATION
                     * !
                     */
                    el('.player__super-wrapper', [
                        player(trax, 0)
                    ])
                ])
            ])
        ])
    ]);
}