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

// import { podcasts } from "./podcasts"
// import { tracks } from "./tracks"

export default function mainPageInit() {
    /**
     * ! fetch /tracks - GET
     */

    /**
    * ! fetch /favourite - GET
    */
   
    let tracks = request.fetchTracks() as Promise<OmitFavouriteTrack[]>
    // const tracking = trackingPromise.then((tracking) => {
    // return tracking
    // })
    // console.log(tracking);
    // console.log(tracks);
    let trax: Promise<ITrack[] /*& IPodcast*/> = tracksProcess(tracks, /*podcasts*/);

    trax.then((tracking) => {
        setChildren(window.document.body, [
            header(tracking),
            el('main', [
                el('.container', [
                    el('.main-page-wrapper', [
                        aside('main'),
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
