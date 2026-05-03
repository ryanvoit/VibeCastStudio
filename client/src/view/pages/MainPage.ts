import { aside } from "../components/aside";
import { header } from "../components/header";
import { setChildren, el } from "redom";
import { mainTable } from "../components/mainTable";
import { player } from "../components/player";
import { IPodcast, ITrack } from "../../services/types";
import { tracksProcess } from "../../services/trackProcess";
import requestClass from "../../model/requestClass.ts";
import { OmitFavouriteTrack } from "../../services/types";

const request = new requestClass()

import { podcasts } from "./podcasts"
import { tracks } from "./tracks"

export default function mainPageInit() {
    /**
     * ! fetch /tracks - GET
     */
    let tracking = request.fetchTracks() as Promise<OmitFavouriteTrack> 
    console.log(tracking);
    let trax: Array<ITrack & IPodcast> = tracksProcess(tracks, podcasts)

    setChildren(window.document.body, [
        header(trax),
        el('main', [
            el('.container', [
                el('.main-page-wrapper', [
                    aside('main'),
                    el('.main-table__super-wrapper', [
                        mainTable(trax),
                    ]),
                    el('.player__super-wrapper', [
                        player(trax, 0)
                    ])
                ])
            ])
        ])
    ]);
}