import { OmitFavouriteTrack /*, OmitFavouritePodcast, IPodcast*/, ITrack } from "./types";

export function tracksProcess(tracks: Promise<OmitFavouriteTrack[]>/*, podcasts: Array<OmitFavouritePodcast>*/): Promise<ITrack[]/*& IPodcast*/> {
    return tracks.then((tracksx) => {
        let trax = []
        // let idArr: number[] = []

        for (let i = 0; i < tracksx.length; i++) {
            let track = tracksx[i];

            const tracks2 = {
                ...track,
                favourite: false
            }

            // idArr.push((tracks)[i].id)
            trax.push(tracks2)
        }
        return trax
    })

    // const max = Math.max(...idArr)

    /*
    for (let i = 0; i < podcasts.length; i++) {
        let podcast = podcasts[i];

        const podcast2 = {
            ...podcast,
            id: podcast.id + max,
            favourite: false
        }

        trax.push(podcast2)
    }
        */

    /**
     * ! fetch /favourite - GET --> if(favourite) --> favourite: true
     */
}