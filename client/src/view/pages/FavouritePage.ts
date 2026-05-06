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

export default function favouritePageInit(username: string, token: string) {
    console.log(token);
    let tracks = request.fetchTracks(token) as Promise<OmitFavouriteTrack[]>
    let trax: Promise<ITrack[]> = tracksProcess(tracks, /*podcasts*/)
    let tracksFav = request.fetchFavouriteTracks(token) as Promise<OmitFavouriteTrack[]>
    let traxFav: Promise<ITrack[] /*& IPodcast*/> = tracksProcess(tracksFav, /*podcasts*/);

    trax.then((tracking) => {
        traxFav.then((trackingFav) => {
            setChildren(window.document.body, [
                header(tracking, username, token, trackingFav),
                el('main', [
                    el('.container', [
                        el('.main-page-wrapper', [
                            aside('favourite'),
                            el('.main-table__super-wrapper', [
                                mainTable(tracking, token, trackingFav),
                            ]),
                            el('.player__super-wrapper', [
                                player(tracking, 0, token)
                            ])
                        ])
                    ])
                ])
            ]);

        })
    })
}