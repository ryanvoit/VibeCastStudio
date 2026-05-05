import { aside } from "../components/aside";
import { header } from "../components/header";
import { setChildren, el } from "redom";
import { mainTable } from "../components/mainTable";
import { player } from "../components/player";
import { IPodcast, ITrack } from "../../services/types";
import { tracksProcess } from "../../services/trackProcess";
import requestClass from "../../model/requestClass.ts";
import { OmitFavouriteTrack } from "../../services/types";

// import { tracks } from './tracks';
// import { podcasts } from "./podcasts"

const request = new requestClass()

export default function favouritePageInit() {
    let tracks = request.fetchFavouriteTracks() as Promise<OmitFavouriteTrack[]>
    let trax: Promise<ITrack[]> = tracksProcess(tracks, /*podcasts*/)
    // console.log(trax);

    trax.then((tracking) => {
        setChildren(window.document.body, [
            header(tracking),
            el('main', [
                el('.container', [
                    el('.main-page-wrapper', [
                        aside('favourite'),
                        el('.main-table__super-wrapper', [
                            mainTable(tracking),
                        ]),
                        el('.player__super-wrapper', [
                            player(tracking, 0)
                        ])
                    ])
                ])
            ])
        ]);
    })
}